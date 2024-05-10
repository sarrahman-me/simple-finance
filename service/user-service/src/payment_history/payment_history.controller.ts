import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistory } from './payment_history.model';

interface responseType {
  message: string;
  status: number;
  data: PaymentHistory | PaymentHistory[];
  metadata?: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}

@Controller('history-account')
export class PaymentHistoryController {
  constructor(private readonly historyService: PaymentHistoryService) {}

  @Get('/:account_number')
  async findAll(
    @Param('account_number') account_number: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<responseType> {
    try {
      const { data, metadata } =
        await this.historyService.findAllByPaymentAccount(account_number, {
          limit,
          page,
        });

      return {
        message: 'successfully obtained all transaction history',
        status: HttpStatus.OK,
        data,
        metadata,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async find(@Param('id') id: number): Promise<responseType> {
    try {
      const data = await this.historyService.find(id);

      return {
        message: 'successfully obtained transaction history',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(
    @Body()
    {
      amount,
      status,
      type,
      id_transaction,
      account_number,
    }: Partial<PaymentHistory>,
  ): Promise<responseType> {
    // validate input
    if (!amount || !status || !id_transaction || !account_number) {
      throw new BadRequestException({
        message: 'Incomplete data',
        error: {
          missing_fields: {
            amount: !amount ? 'amount is required' : '',
            status: !status ? 'status is required' : '',
            id_transaction: !id_transaction ? 'Transaction ID is required' : '',
            account_number: !account_number
              ? 'payment account is required'
              : '',
          },
        },
      });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      throw new BadRequestException({
        message: 'Invalid amount',
        error: {
          amount: 'amount must be a positive number',
        },
      });
    }

    try {
      const data = await this.historyService.create({
        amount,
        status,
        type,
        id_transaction,
        account_number,
      });

      return {
        message: 'Successfully added transaction history',
        status: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
