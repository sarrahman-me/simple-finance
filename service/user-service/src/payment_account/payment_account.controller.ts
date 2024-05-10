import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentAccountService } from './payment_account.service';
import { PaymentAccount } from './payment_account.model';

interface responseType {
  message: string;
  status: number;
  data: PaymentAccount | PaymentAccount[];
}

@Controller('payment-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @Get('/username/:username')
  async findByUsername(
    @Param('username') username: string,
  ): Promise<responseType> {
    try {
      const data = await this.paymentAccountService.findAllByUsername(username);

      return {
        message: 'successfully got all payment accounts',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/:account_number')
  async find(
    @Param('account_number') account_number: string,
  ): Promise<responseType> {
    try {
      const data =
        await this.paymentAccountService.findByAccountNumber(account_number);

      return {
        message: 'successfully got payment accounts',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(
    @Body() { name, username }: Partial<PaymentAccount>,
  ): Promise<responseType> {
    if (!name || !username) {
      throw new BadRequestException('incomplete data');
    }

    try {
      const data = await this.paymentAccountService.add(name, username);

      return {
        message: 'successfully added payment account',
        status: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:account_number')
  async update(
    @Param('account_number') account_number: string,
    @Body() { name, balance }: Partial<PaymentAccount>,
  ): Promise<responseType> {
    try {
      const data = await this.paymentAccountService.update(account_number, {
        name,
        balance,
      });

      return {
        message: 'successfully updated payment account',
        status: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:account_number')
  async delete(
    @Param('account_number') account_number: string,
  ): Promise<responseType> {
    try {
      const data = await this.paymentAccountService.delete(account_number);

      return {
        message: 'successfully deleted payment account',
        status: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
