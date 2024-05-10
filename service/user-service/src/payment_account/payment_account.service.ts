import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentAccount } from './payment_account.model';
import { GeneratorService } from 'src/generator/generator.service';

@Injectable()
export class PaymentAccountService {
  constructor(
    @InjectModel(PaymentAccount)
    private readonly paymentAccount: typeof PaymentAccount,

    private readonly generator: GeneratorService,
  ) {}

  /**
   * get all payment accounts based on the owner's username
   * @param username foreign key untuk user
   * @returns all appropriate payment accounts
   */

  async findAllByUsername(username: string): Promise<PaymentAccount[]> {
    return this.paymentAccount.findAll({
      where: {
        username,
      },
    });
  }

  /**
   * get payment account based on account number
   * @param account_number primary key
   * @returns appropriate payment account
   */

  async findByAccountNumber(account_number: string): Promise<PaymentAccount> {
    const data = await this.paymentAccount.findByPk(account_number);

    if (!data) {
      throw new NotFoundException('payment account not found');
    }

    return data;
  }

  /**
   * create a new payment account
   * @param name
   * @returns newly created payment account
   */

  async add(name: string): Promise<PaymentAccount> {
    const account_number = this.generator.accountNumber();
    const balance_default = 0.0;

    return this.paymentAccount.create({
      account_number,
      balance: balance_default,
      name,
    });
  }

  /**
   * update payment account data, only name and balance are allowed to be edited
   * @param account_number primary key
   * @param {name: string, balance: number} payload
   * @returns newly updated payment account
   */

  async update(
    account_number: string,
    { name, balance }: Partial<PaymentAccount>,
  ): Promise<PaymentAccount> {
    await this.paymentAccount.update(
      { name, balance },
      {
        where: {
          account_number,
        },
      },
    );

    return this.paymentAccount.findByPk(account_number);
  }

  /**
   * delete payment account data
   * @param account_number primary key
   * @returns deleted payment account
   */

  async delete(account_number: string): Promise<PaymentAccount> {
    const data = await this.paymentAccount.findByPk(account_number);

    if (!data) {
      throw new NotFoundException('payment account not found');
    }

    await this.paymentAccount.destroy({
      where: {
        account_number,
      },
    });

    return data;
  }
}
