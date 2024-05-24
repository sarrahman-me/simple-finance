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
import { IPaymentAccount } from './interface/payment_account.interface';

interface responseType {
  message: string;
  statusCode: number;
  data: {
    transaction: Transaction;
    from: Partial<IPaymentAccount>;
    to: Partial<IPaymentAccount>;
  };
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
    { amount, description, from_address, to_address }: Partial<Transaction>,
  ): Promise<responseType> {
    // Mandatory input validation
    if (!amount || !from_address || !to_address) {
      throw new BadRequestException({
        message: 'incomplete data',
        error: {
          missing_fields: {
            amount: !amount ? 'amount is required' : '',
            from_address: !from_address
              ? 'Payment account source must be filled in'
              : '',
            to_address: !to_address
              ? 'payment account destination must be filled in'
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
          amount,
          description,
          from_address,
          to_address,
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
