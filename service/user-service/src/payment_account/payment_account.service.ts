import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentAccount } from './payment_account.model';
import { GeneratorService } from 'src/generator/generator.service';
import { Users } from 'src/users/users.model';

@Injectable()
export class PaymentAccountService {
  constructor(
    @InjectModel(PaymentAccount)
    private readonly paymentAccount: typeof PaymentAccount,

    @InjectModel(Users)
    private readonly users: typeof Users,

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
   * Get payment account data based on matching username and account number
   * This is useful for checking payment account ownership
   * @param username
   * @param account_number
   * @returns appropriate data
   */

  async findByUsernameAndAccountNumber(
    username: string,
    account_number: string,
  ): Promise<PaymentAccount> {
    const data = await this.paymentAccount.findOne({
      where: {
        account_number,
        username,
      },
    });

    if (!data) {
      throw new NotFoundException('payment account not found');
    }

    return data;
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

  async add(name: string, username: string): Promise<PaymentAccount> {
    const existingUser = await this.users.findByPk(username);

    if (!existingUser) {
      throw new BadRequestException('Invalid User');
    }

    const account_number = this.generator.accountNumber();
    const balance_default = 0.0;

    return this.paymentAccount.create({
      account_number,
      username,
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
    const existingData = await this.paymentAccount.findByPk(account_number);

    if (!existingData) {
      throw new NotFoundException('payment account not found');
    }

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

  async delete(
    account_number: string,
    username: string,
  ): Promise<PaymentAccount> {
    const data = await this.paymentAccount.findOne({
      where: {
        account_number,
        username,
      },
    });

    if (data.balance > 0) {
      throw new BadRequestException(
        'the payment account has a remaining balance, move the balance to another account first before deleting',
      );
    }

    if (!data) {
      throw new NotFoundException('payment account not found');
    }

    await this.paymentAccount.destroy({
      where: {
        account_number,
        username,
      },
    });

    return data;
  }
}
