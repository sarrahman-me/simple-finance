import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { Model } from 'mongoose';
import { IPaymentAccount } from './interface/payment_account.interface';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

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
      amount,
      currency,
      description,
      from_address,
      to_address,
    }: Partial<Transaction>,
    token: string,
  ): Promise<{
    transaction: Transaction;
    from: Partial<IPaymentAccount>;
    to: Partial<IPaymentAccount>;
  }> {
    try {
      // check data from the payment account source and this account number must be owned by the money sender
      const responseSourceAccount: { data: IPaymentAccount } = await fetch(
        `${process.env.USER_SERVICE}/user/payment-account/${from_address}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      ).then((res) => res.json());

      const sourceAccount = responseSourceAccount.data;

      if (!sourceAccount) {
        throw new BadRequestException(
          'payment account source is invalid, You have to send money from your own payment account',
        );
      }

      // check data from the payment account destination
      const responseDestinationAccount: { data: IPaymentAccount } = await fetch(
        `${process.env.USER_SERVICE}/user/payment-account/check/${to_address}`,
      ).then((res) => res.json());

      const destinationAccount = responseDestinationAccount.data;

      if (!destinationAccount) {
        throw new BadRequestException('payment account destination is invalid');
      }

      // Make sure the balance from the payment account source is sufficient
      if (sourceAccount.balance < amount) {
        throw new BadRequestException(
          'the source account balance is insufficient',
        );
      }

      const id_transaction = uuidv4();

      // create a new transaction
      const createTransaction = await this.transaction.create({
        id_transaction,
        amount,
        currency,
        description,
        status: 'success',
        from_address,
        to_address,
      });

      // update the balance of each account
      await fetch(
        `${process.env.USER_SERVICE}/user/payment-account/${from_address}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            balance: sourceAccount.balance - amount,
          }),
        },
      );

      await fetch(
        `${process.env.USER_SERVICE}/user/payment-account/${to_address}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            balance: Number(destinationAccount.balance) + amount, // destinationAccount.balance must be converted to a number first because of stringify which can cause errors if there is addition (+)
          }),
        },
      );

      // event to record transaction history
      this.userServiceClient.emit('add.history_transaction', {
        amount,
        status: 'success',
        type: 'sender',
        id_transaction: id_transaction,
        account_number: from_address,
      });

      this.userServiceClient.emit('add.history_transaction', {
        amount,
        status: 'success',
        type: 'receiver',
        id_transaction: id_transaction,
        account_number: to_address,
      });

      return {
        transaction: createTransaction,
        from: {
          account_number: sourceAccount.account_number,
          name: sourceAccount.name,
        },
        to: {
          account_number: destinationAccount.account_number,
          name: destinationAccount.name,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
