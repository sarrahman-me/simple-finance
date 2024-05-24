import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { Model } from 'mongoose';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { IPocketDetails } from './interface/pocket_details.interface';
import { IAccountCheck } from './interface/account_check.interface';

@Injectable()
export class TransactionService {
  private readonly userServiceClient: ClientProxy;

  constructor(
    @InjectModel(Transaction.name)
    private readonly transaction: Model<TransactionDocument>,
  ) {
    this.userServiceClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: 'user_service',
      },
    });
  }

  /**
   * sending money from the source account to the registered destination account
   * @param payload
   * @returns successful transaction
   */

  async send(
    {
      transaction_type,
      amount,
      from_pocket,
      to_pocket,
      description,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      from_address,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      to_address,
    }: Partial<Transaction>,
    token: string,
  ): Promise<Transaction> {
    try {
      let transaction: Transaction;
      if (transaction_type === 'interpocket') {
        transaction = await this.handleInterPocket(
          {
            amount,
            from_pocket,
            to_pocket,
            description,
          },
          token,
        );
      } else if (transaction_type === 'interbank') {
        // await this.handleInterBank(
        //   {
        //     amount,
        //     from_currency,
        //     to_currency,
        //     from_pocket,
        //     to_pocket,
        //     description,
        //     from_address,
        //     to_address,
        //   },
        //   token,
        // );

        throw new BadRequestException(
          'does not yet support sending between user',
        );
      } else {
        throw new BadRequestException('Invalid type transaction');
      }

      return transaction;
    } catch (error) {
      throw error;
    }
  }

  private async handleInterPocket(
    { amount, from_pocket, to_pocket, description }: Partial<Transaction>,
    token: string,
  ): Promise<Transaction> {
    try {
      // cek dulu apakah pocket ada dan sumber dan tujuan dari akun yang sama
      const sourcePocket = await this.getPocketDetails(from_pocket, token);

      const destinationPocket = await this.getPocketDetails(to_pocket, token);

      // Make sure the balance from the pocket source is sufficient
      if (Number(sourcePocket.data.balance) < amount) {
        throw new BadRequestException(
          'the source account balance is insufficient',
        );
      }

      // membuat transaksi
      const id_transaction = uuidv4();

      // create a new transaction
      const createdTransaction = await this.transaction.create({
        id_transaction,
        transaction_type: 'interpocket',
        amount,
        status: 'success',
        description,
        from_currency: sourcePocket.data.payment_account.currency,
        to_currency: destinationPocket.data.payment_account.currency,
        from_pocket,
        to_pocket,
        from_address: sourcePocket.data.account_number,
        to_address: destinationPocket.data.account_number,
        timestamp: new Date(),
      });

      // mengupdate saldo masing masing
      await this.updateAccountBalance(
        from_pocket,
        Number(sourcePocket.data.balance) - amount,
        token,
      );

      await this.updateAccountBalance(
        to_pocket,
        Number(destinationPocket.data.balance) + amount,
        token,
      );

      // mengirimkan data untuk riwayat transaksi
      this.emitTransactionHistory(
        id_transaction,
        amount,
        from_pocket,
        to_pocket,
        sourcePocket.data.account_number,
        destinationPocket.data.account_number,
        'interpocket',
      );

      return createdTransaction;
    } catch (error) {
      throw error;
    }
  }

  // private async handleInterBank(
  //   {
  //     amount,
  //     from_currency,
  //     to_currency,
  //     from_pocket,
  //     to_pocket,
  //     description,
  //     from_address,
  //     to_address,
  //   }: Partial<Transaction>,
  //   token: string,
  // ) {
  //   // cek dulu apakah pocket ada dan sumber dari akun yang sama dengan pengirim
  //   const sourcePocket = await this.getPocketDetails(from_pocket, token);

  //   // cek akun pembayaran dan pocket tujuan ada
  //   const destinationAccount = await this.checkAccount(to_address, token);

  //   // Make sure the balance from the pocket source is sufficient
  //   if (Number(sourcePocket.data.balance) < amount) {
  //     throw new BadRequestException(
  //       'the source account balance is insufficient',
  //     );
  //   }

  //   // TODO:  melakukan konversi dari uang sumber ke rekening tujuan jika berbeda

  //   // create a new transaction

  //   // membuat transaksi
  //   // mengupdate saldo masing masing
  //   // mengirimkan data untuk riwayat transaksi
  // }

  private async getPocketDetails(
    id_pocket: string,
    token: string,
  ): Promise<IPocketDetails> {
    const response = await fetch(
      `${process.env.USER_SERVICE}/user/pocket/${id_pocket}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data: IPocketDetails = await response.json();

    if (!data) {
      throw new BadRequestException('Invalid pocket or pocket not found');
    }

    return data;
  }

  private async checkAccount(
    account_number: string,
    token: string,
  ): Promise<IAccountCheck> {
    const response = await fetch(
      `${process.env.USER_SERVICE}/user/payment-account/check/${account_number}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data: IAccountCheck = await response.json();

    if (!data) {
      throw new BadRequestException('Payment Account not found');
    }

    return data;
  }

  private async updateAccountBalance(
    id_pocket: string,
    newBalance: number,
    token: string,
  ): Promise<void> {
    await fetch(`${process.env.USER_SERVICE}/user/pocket/${id_pocket}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        balance: newBalance,
      }),
    });
  }

  private emitTransactionHistory(
    id_transaction: string,
    amount: number,
    from_pocket: string,
    to_pocket: string,
    from_address: string,
    to_address: string,
    transaction_type: string,
  ): void {
    this.userServiceClient.emit('add.history_transaction', {
      amount,
      status: 'success',
      type: 'sender',
      id_transaction,
      account_number: from_address,
      id_pocket: from_pocket,
      transaction_type,
    });

    this.userServiceClient.emit('add.history_transaction', {
      amount,
      status: 'success',
      type: 'receiver',
      id_transaction,
      account_number: to_address,
      id_pocket: to_pocket,
      transaction_type,
    });
  }
}
