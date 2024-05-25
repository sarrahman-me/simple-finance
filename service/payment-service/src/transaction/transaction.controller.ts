import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.schema';
import { AuthGuard } from './auth.guard';

interface responseType {
  message: string;
  statusCode: number;
  data: Transaction;
}

@Controller('')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Post('send')
  async send(
    @Request()
    req: {
      token: string;
    },
    @Body()
    {
      transaction_type,
      amount,
      from_pocket,
      to_pocket,
      description,
    }: Partial<Transaction>,
  ): Promise<responseType> {
    // Mandatory input validation
    if (!amount || !transaction_type) {
      throw new BadRequestException({
        message: 'incomplete data',
        error: {
          missing_fields: {
            amount: !amount ? 'amount is required' : '',
            transaction_type: !transaction_type
              ? 'transaction type is required'
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
      const data = await this.transactionService.send(
        {
          transaction_type,
          amount,
          from_pocket,
          to_pocket,
          description,
        },
        req.token,
      );

      return {
        message: 'successfully sent money to the destination account',
        statusCode: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
