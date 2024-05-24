import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PocketHistory } from './pocket_history.model';
import { PocketHistoryService } from './pocket_history.service';

interface responseType {
  message: string;
  statusCode: number;
  data: PocketHistory | PocketHistory[];
  metadata?: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}

@Controller('pocket-history')
export class PocketHistoryController {
  constructor(private readonly historyService: PocketHistoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAllByPayment(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
        account_number: string;
      };
    },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<responseType> {
    try {
      const { data, metadata } =
        await this.historyService.findAllByPaymentAccount(
          req.user.account_number,
          {
            limit,
            page,
          },
        );

      return {
        message: 'successfully obtained all transaction history',
        statusCode: HttpStatus.OK,
        data,
        metadata,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id_pocket')
  async findAllByPocket(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
        account_number: string;
      };
    },
    @Param('id_pocket') id_pocket: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<responseType> {
    try {
      const { data, metadata } = await this.historyService.findAllByPocket(
        id_pocket,
        req.user.account_number,
        {
          limit,
          page,
        },
      );

      return {
        message: 'successfully obtained all transaction history in pocket',
        statusCode: HttpStatus.OK,
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
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
