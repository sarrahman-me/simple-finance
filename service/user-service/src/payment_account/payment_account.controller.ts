import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PaymentAccountService } from './payment_account.service';
import { PaymentAccount } from './payment_account.model';
import { AuthGuard } from '../auth/auth.guard';

interface responseType {
  message: string;
  statusCode: number;
  data: PaymentAccount | { account_number: string; pic: string };
}

@Controller('payment-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @UseGuards(AuthGuard)
  @Get('/:account_number')
  async find(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
      };
    },
    @Param('account_number') account_number: string,
  ): Promise<responseType> {
    try {
      const data =
        await this.paymentAccountService.findByUsernameAndAccountNumber(
          req.user.username,
          account_number,
        );

      return {
        message: 'successfully got payment accounts',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/check/:account_number')
  async checkOwnership(
    @Param('account_number') account_number: string,
  ): Promise<responseType> {
    try {
      const data =
        await this.paymentAccountService.findByAccountNumber(account_number);

      return {
        message: 'successfully got payment accounts',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:account_number')
  async update(
    @Param('account_number') account_number: string,
    @Body() { pin, currency }: Partial<PaymentAccount>,
  ): Promise<responseType> {
    try {
      const data = await this.paymentAccountService.update(account_number, {
        pin,
        currency,
      });

      return {
        message: 'successfully updated payment account',
        statusCode: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
