import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistory } from './payment_history.model';
import { AuthGuard } from '../auth/auth.guard';

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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
}
