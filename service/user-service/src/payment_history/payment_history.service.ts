import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentHistory } from './payment_history.model';
import { PaymentAccountService } from 'src/payment_account/payment_account.service';

@Injectable()
export class PaymentHistoryService {
  constructor(
    private readonly paymentHistory: typeof PaymentHistory,

    private readonly paymentAccountService: PaymentAccountService,
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
    id_transaction,
    account_number,
  }: Partial<PaymentHistory>): Promise<PaymentHistory> {
    const paymentAccount =
      await this.paymentAccountService.findByAccountNumber(account_number);

    if (!paymentAccount) {
      throw new NotFoundException('payment account not found');
    }

    return this.paymentHistory.create({
      account_number,
      id_transaction,
      status,
      amount,
    });
  }
}
