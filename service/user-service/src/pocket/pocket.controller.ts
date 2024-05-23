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
  @Get('/:id_pocket')
  async find(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
      };
    },
    @Param('id_pocket') id_pocket: string,
  ): Promise<responseType> {
    try {
      const data = await this.pocketService.findByIdPocketAndAccountNumber(
        req.user.username,
        id_pocket,
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

  @Patch('/:account_number')
  async update(
    @Param('account_number') account_number: string,
    @Body() { name, color }: Partial<Pocket>,
  ): Promise<responseType> {
    try {
      const data = await this.pocketService.update(account_number, {
        name,
        color,
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
