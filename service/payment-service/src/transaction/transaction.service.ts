import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { Model } from 'mongoose';
import { IPaymentAccount } from './interface/payment_account.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transaction: Model<TransactionDocument>,
  ) {}

  /**
   * sending money from the source account to the registered destination account
   * @param payload
   * @returns successful transaction
   */

  async send({
    amount,
    currency,
    description,
    from_address,
    to_address,
  }: Partial<Transaction>): Promise<Transaction> {
    try {
      // check data from the payment account source
      const responseSourceAccount: { data: IPaymentAccount } = await fetch(
        `${process.env.USER_SERVICE}/user/payment-account/${from_address}`,
      ).then((res) => res.json());

      const sourceAccount = responseSourceAccount.data;

      if (!sourceAccount) {
        throw new BadRequestException('payment account source is invalid');
      }

      // check data from the payment account destination
      const responseDestinationAccount: { data: IPaymentAccount } = await fetch(
        `${process.env.USER_SERVICE}/user/payment-account/${to_address}`,
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

      // update the balance of each account
      await fetch(
        `${process.env.USER_SERVICE}/user/payment-account/${from_address}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            balance: Number(sourceAccount.balance) - amount,
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
            balance: Number(destinationAccount.balance) + amount,
          }),
        },
      );

      // TODO : mengirimkan history transaksi ke masing masing akun

      return this.transaction.create({
        amount,
        currency,
        description,
        status: 'success',
        from_address,
        to_address,
      });
    } catch (error) {
      throw error;
    }
  }
}
