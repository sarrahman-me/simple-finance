import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pocket } from 'src/pocket/pocket.model';
import { PocketHistory } from './pocket_history.model';

@Injectable()
export class PocketHistoryService {
  constructor(
    @InjectModel(PocketHistory)
    private readonly pocketHistory: typeof PocketHistory,

    @InjectModel(Pocket)
    private readonly pocket: typeof Pocket,
  ) {}

  /**
   * get all historical data based on payment accounts by pagination
   * @param account_number
   * @param {page: number, limit: number} payload
   * @returns relevant data
   */

  async findAllByPaymentAccount(
    account_number: string,
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
  ): Promise<{
    data: PocketHistory[];
    metadata: {
      page: number;
      limit: number;
      totalData: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.pocketHistory.findAndCountAll({
      offset,
      limit,
      where: {
        account_number,
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
   * get all historical data based on payment accounts by pagination
   * @param id_pocket
   * @param {page: number, limit: number} payload
   * @returns relevant data
   */

  async findAllByPocket(
    id_pocket: string,
    account_number: string,
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
  ): Promise<{
    data: PocketHistory[];
    metadata: {
      page: number;
      limit: number;
      totalData: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.pocketHistory.findAndCountAll({
      offset,
      limit,
      where: {
        id_pocket,
        account_number,
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

  async find(id: number): Promise<PocketHistory> {
    const data = await this.pocketHistory.findByPk(id);

    if (!data) {
      throw new NotFoundException('History details not found');
    }

    return data;
  }

  /**
   * create a new transaction history
   * @param {Partial<PocketHistory>} payload
   * @returns new history
   */

  async create({
    amount,
    status,
    type,
    id_transaction,
    id_pocket,
  }: Partial<PocketHistory>): Promise<PocketHistory> {
    const pocketData = await this.pocket.findByPk(id_pocket);

    if (!pocketData) {
      throw new NotFoundException('Pocket not found');
    }

    return this.pocketHistory.create({
      id_pocket,
      id_transaction,
      type,
      status,
      amount,
    });
  }
}
