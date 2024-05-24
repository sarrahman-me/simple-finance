import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentAccount } from './payment_account.model';
import { Users } from '../users/users.model';
import { GeneratorService } from 'src/generator/generator.service';
import { Pocket } from 'src/pocket/pocket.model';

@Injectable()
export class PaymentAccountService {
  constructor(
    @InjectModel(PaymentAccount)
    private readonly paymentAccount: typeof PaymentAccount,

    @InjectModel(Users)
    private readonly users: typeof Users,

    @InjectModel(Pocket)
    private readonly pocket: typeof Pocket,

    private readonly generator: GeneratorService,
  ) {}

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
      include: {
        model: Users,
      },
    });

    if (!data) {
      throw new NotFoundException(
        'payment account not found or this is not your payment account',
      );
    }

    return data;
  }

  /**
   * get payment account based on account number
   * @param account_number primary key
   * @returns appropriate payment account
   */

  async findByAccountNumber(account_number: string): Promise<{
    account_number: string;
    pic: string;
  }> {
    const data = await this.paymentAccount.findOne({
      where: {
        account_number,
      },
      include: {
        model: Users,
      },
    });

    if (!data) {
      throw new NotFoundException('payment account not found');
    }

    return {
      account_number: data.account_number,
      pic: data.user.name,
    };
  }

  /**
   * create a new payment account
   * @param name
   * @returns newly created payment account
   */

  async add(
    pin: string,
    currency: string,
    username: string,
    pic: string,
  ): Promise<PaymentAccount> {
    const existingUser = await this.users.findByPk(username);

    if (!existingUser) {
      throw new BadRequestException('Invalid User');
    }

    // prevent duplication of payment accounts with the same usernam for the same account
    const existingData = await this.paymentAccount.findOne({
      where: {
        username,
      },
    });

    if (existingData) {
      throw new ConflictException('Payment Account has been added');
    }

    const account_number = this.generator.accountNumber();

    const addedData = await this.paymentAccount.create({
      pic,
      account_number,
      username,
      pin,
      currency,
    });

    await this.pocket.create({
      id_pocket: account_number,
      name: 'Main pocket',
      color: '#0284c7',
      balance: 0.0,
      account_number,
    });

    return addedData;
  }

  /**
   * update payment account data, only pin and currency are allowed to be edited
   * @param account_number primary key
   * @param {name: string, balance: number} payload
   * @returns newly updated payment account
   */

  async update(
    account_number: string,
    { pin, currency }: Partial<PaymentAccount>,
  ): Promise<PaymentAccount> {
    const existingData = await this.paymentAccount.findByPk(account_number);

    if (!existingData) {
      throw new NotFoundException('payment account not found');
    }

    await this.paymentAccount.update(
      { pin, currency },
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

  async delete(username: string): Promise<PaymentAccount> {
    const data = await this.paymentAccount.findOne({
      where: {
        username,
      },
    });

    if (!data) {
      throw new NotFoundException('payment account not found');
    }

    await this.paymentAccount.destroy({
      where: {
        username,
      },
    });

    return data;
  }
}
