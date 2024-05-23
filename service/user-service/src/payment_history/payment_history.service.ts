import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentHistory } from './payment_history.model';
import { InjectModel } from '@nestjs/sequelize';
import { Pocket } from 'src/pocket/pocket.model';

@Injectable()
export class PaymentHistoryService {
  constructor(
    @InjectModel(PaymentHistory)
    private readonly paymentHistory: typeof PaymentHistory,

    @InjectModel(Pocket)
    private readonly pocket: typeof Pocket,
  ) {}

  /**
   * get all historical data based on payment accounts by pagination
   * @param id_pocket
   * @param {page: number, limit: number} payload
   * @returns relevant data
   */

  async findAllByPaymentAccount(
    id_pocket: string,
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
  ): Promise<{
    data: PaymentHistory[];
    metadata: {
      page: number;
      limit: number;
      totalData: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.paymentHistory.findAndCountAll({
      offset,
      limit,
      where: {
        id_pocket,
      },
    });

    // calculate total data and pages
    const totalData = count;
    const totalPages = Math.ceil(totalData / limit);

    return {
      data: rows,
      metadata: {
        limit,
        page,
        totalData,
        totalPages,
      },
    };
  }

  /**
   * Get detailed transaction history
   * @param id primary key
   * @returns transaction history
   */

  async find(id: number): Promise<PaymentHistory> {
    const data = await this.paymentHistory.findByPk(id);

    if (!data) {
      throw new NotFoundException('History details not found');
    }

    return data;
  }

  /**
   * create a new transaction history
   * @param {Partial<PaymentHistory>} payload
   * @returns new history
   */

  async create({
    amount,
    status,
    type,
    id_transaction,
    id_pocket,
  }: Partial<PaymentHistory>): Promise<PaymentHistory> {
    const pocketData = await this.pocket.findByPk(id_pocket);

    if (!pocketData) {
      throw new NotFoundException('Pocket not found');
    }

    return this.paymentHistory.create({
      id_pocket,
      id_transaction,
      type,
      status,
      amount,
    });
  }
}
