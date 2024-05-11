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
  Request,
  UseGuards,
} from '@nestjs/common';
import { PaymentAccountService } from './payment_account.service';
import { PaymentAccount } from './payment_account.model';
import { AuthGuard } from '../auth/auth.guard';

interface responseType {
  message: string;
  status: number;
  data: PaymentAccount | PaymentAccount[];
}

@Controller('payment-account')
export class PaymentAccountController {
  constructor(private readonly paymentAccountService: PaymentAccountService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
      };
    },
  ): Promise<responseType> {
    try {
      const data = await this.paymentAccountService.findAllByUsername(
        req.user.username,
      );

      return {
        message: 'successfully got all payment accounts',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

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
        status: HttpStatus.OK,
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
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
      };
    },
    @Body() { name }: Partial<PaymentAccount>,
  ): Promise<responseType> {
    if (!name) {
      throw new BadRequestException('incomplete data');
    }

    try {
      const data = await this.paymentAccountService.add(
        name,
        req.user.username,
      );

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
    // Validate balance
    if (isNaN(balance) || balance < 0) {
      throw new BadRequestException({
        message: 'Invalid balance',
        error: {
          balance: 'the balance amount is invalid or a negative number',
        },
      });
    }

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

  @UseGuards(AuthGuard)
  @Delete('/:account_number')
  async delete(
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
      const data = await this.paymentAccountService.delete(
        account_number,
        req.user.username,
      );

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
