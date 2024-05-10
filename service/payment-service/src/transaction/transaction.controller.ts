import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.schema';

interface responseType {
  message: string;
  status: number;
  data: Transaction;
}

@Controller('payment')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('send')
  async send({
    amount,
    currency,
    description,
    from_address,
    to_address,
  }: Partial<Transaction>): Promise<responseType> {
    // Mandatory input validation
    if (!amount || !currency || !from_address || !to_address) {
      throw new BadRequestException({
        message: 'incomplete data',
        error: {
          missing_fields: {
            amount: !amount ? 'amount is required' : '',

            currency: !currency ? 'currency is required' : '',

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
      const data = await this.transactionService.send({
        amount,
        currency,
        description,
        from_address,
        to_address,
      });

      return {
        message: 'successfully sent money to the destination account',
        status: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}