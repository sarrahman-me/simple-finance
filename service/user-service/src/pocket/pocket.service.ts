import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GeneratorService } from '../generator/generator.service';
import { Pocket } from './pocket.model';
import { PaymentAccount } from 'src/payment_account/payment_account.model';

@Injectable()
export class PocketService {
  constructor(
    @InjectModel(Pocket)
    private readonly pocket: typeof Pocket,

    @InjectModel(PaymentAccount)
    private readonly paymentAccount: typeof PaymentAccount,

    private readonly generator: GeneratorService,
  ) {}

  /**
   * Get pocket data based on matching id pocket and account number
   * This is useful for checking pocket ownership
   * @param username
   * @param account_number
   * @returns appropriate data
   */

  async findByIdPocketAndAccountNumber(
    id_pocket: string,
    account_number: string,
  ): Promise<Pocket> {
    const data = await this.pocket.findOne({
      where: {
        account_number,
        id_pocket,
      },
      include: {
        model: PaymentAccount,
      },
    });

    if (!data) {
      throw new NotFoundException(
        'Pocket not found or this is not your pocket',
      );
    }

    return data;
  }

  /**
   * create a new payment account
   * @param name
   * @returns newly created payment account
   */

  async add(
    name: string,
    color: string,
    account_number: string,
  ): Promise<Pocket> {
    const existingPayAccount =
      await this.paymentAccount.findByPk(account_number);

    if (!existingPayAccount) {
      throw new BadRequestException('Invalid Payment Account');
    }

    // prevent duplication of Pocket with the same usernam for the same account
    const existingData = await this.pocket.findOne({
      where: {
        name,
        account_number,
      },
    });

    if (existingData) {
      throw new ConflictException('Pocket has been added');
    }

    const id_pocket = this.generator.accountNumber();

    return this.pocket.create({
      id_pocket,
      name,
      color,
      balance: 0.0,
      account_number,
    });
  }

  /**
   * update payment account data, only pin and currency are allowed to be edited
   * @param account_number primary key
   * @param {name: string, balance: number} payload
   * @returns newly updated payment account
   */

  async update(
    account_number: string,
    { name, color }: Partial<Pocket>,
  ): Promise<Pocket> {
    const existingData = await this.paymentAccount.findByPk(account_number);

    if (!existingData) {
      throw new NotFoundException('payment account not found');
    }

    await this.pocket.update(
      { name, color },
      {
        where: {
          account_number,
        },
      },
    );

    return this.pocket.findByPk(account_number);
  }

  /**
   * delete payment account data
   * @param account_number primary key
   * @returns deleted payment account
   */

  async delete(id_pocket: string): Promise<Pocket> {
    const data = await this.pocket.findByPk(id_pocket);

    if (!data) {
      throw new NotFoundException('payment account not found');
    }

    await this.pocket.destroy({
      where: {
        id_pocket,
      },
    });

    return data;
  }
}
