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
   * get all payment accounts based on the owner's payment Account
   * @param account_number Account foreign key untuk user
   * @returns all appropriate payment accounts
   */

  async findAllByAccountNumber(account_number: string): Promise<Pocket[]> {
    return this.pocket.findAll({
      where: {
        account_number,
      },
    });
  }

  /**
   * Get pocket data based on matching id pocket and account number
   * This is useful for checking pocket ownership
   * @param account_number
   * @param id_pocket
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

  async checkPocket(id_pocket: string): Promise<Pocket> {
    const data = await this.pocket.findOne({
      where: {
        id_pocket,
      },
      include: {
        model: PaymentAccount,
      },
    });

    if (!data) {
      throw new NotFoundException('Pocket not found ');
    }

    return data;
  }

  /**
   * create a new pocket
   * @param name
   * @returns newly created pocket
   */

  async add(
    name: string,
    color: string,
    account_number: string,
  ): Promise<Pocket> {
    const existingPayAccount =
      await this.paymentAccount.findByPk(account_number);

    if (!existingPayAccount) {
      throw new BadRequestException('Invalid payment account');
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
   * update pocket data, only pin and currency are allowed to be edited
   * @param id_pocket primary key
   * @param {name: string, balance: number} payload
   * @returns newly updated pocket
   */

  async update(
    id_pocket: string,
    { name, color, balance }: Partial<Pocket>,
  ): Promise<Pocket> {
    const existingData = await this.pocket.findByPk(id_pocket);

    if (!existingData) {
      throw new NotFoundException('pocket not found');
    }

    await this.pocket.update(
      { name, color, balance },
      {
        where: {
          id_pocket,
        },
      },
    );

    return this.pocket.findByPk(id_pocket);
  }

  /**
   * delete pocket data
   * @param id_pocket primary key
   * @returns deleted pocket
   */

  async delete(id_pocket: string, account_number: string): Promise<Pocket> {
    if (id_pocket === account_number) {
      throw new BadRequestException('The main pocket must not be removed');
    }

    const data = await this.pocket.findOne({
      where: {
        id_pocket,
        account_number,
      },
    });

    if (!data) {
      throw new NotFoundException('pocket not found');
    }

    await this.pocket.destroy({
      where: {
        id_pocket,
        account_number,
      },
    });

    return data;
  }
}
