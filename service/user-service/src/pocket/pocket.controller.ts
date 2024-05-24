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
import { PocketService } from './pocket.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Pocket } from './pocket.model';

interface responseType {
  message: string;
  statusCode: number;
  data: any;
}

@Controller('pocket')
export class PocketController {
  constructor(private readonly pocketService: PocketService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
        account_number: string;
      };
    },
  ): Promise<responseType> {
    try {
      const data = await this.pocketService.findAllByAccountNumber(
        req.user.account_number,
      );

      return {
        message: 'successfully got all pocket',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id_pocket')
  async find(
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
  ): Promise<responseType> {
    try {
      const data = await this.pocketService.findByIdPocketAndAccountNumber(
        id_pocket,
        req.user.account_number,
      );

      return {
        message: 'successfully got pocket',
        statusCode: HttpStatus.OK,
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
        account_number: string;
      };
    },
    @Body() { name, color }: Partial<Pocket>,
  ): Promise<responseType> {
    try {
      const data = await this.pocketService.add(
        name,
        color,
        req.user.account_number,
      );

      return {
        message: 'successfully create new pocket',
        statusCode: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Patch('/:id_pocket')
  async update(
    @Param('id_pocket') id_pocket: string,
    @Body() { name, color, balance }: Partial<Pocket>,
  ): Promise<responseType> {
    // Validate balance
    if (balance) {
      if (isNaN(balance) || balance < 0) {
        throw new BadRequestException({
          message: 'Invalid amount',
          error: {
            amount: 'amount must be a positive number',
          },
        });
      }
    }

    try {
      const data = await this.pocketService.update(id_pocket, {
        name,
        color,
        balance,
      });

      return {
        message: 'successfully updated pocket',
        statusCode: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id_pocket')
  async delete(
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
  ): Promise<responseType> {
    try {
      const data = await this.pocketService.delete(
        id_pocket,
        req.user.account_number,
      );

      return {
        message: 'successfully delete pocket',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
