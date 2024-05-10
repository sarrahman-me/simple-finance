import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.model';

interface responseType {
  message: string;
  status: number;
  data: Users | Users[];
  metadata?: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search?: string,
  ): Promise<responseType> {
    try {
      const { data, metadata } = await this.usersService.findAll({
        limit,
        page,
        search,
      });

      return {
        message: 'Successfully got all user data',
        status: HttpStatus.OK,
        data,
        metadata,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/:username')
  async find(@Param('username') username: string): Promise<responseType> {
    try {
      const data = await this.usersService.find(username);

      return {
        message: 'Successfully got user data',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:username')
  async update(
    @Param('username') username: string,
    @Body() payload: Partial<Users>,
  ): Promise<responseType> {
    try {
      const data = await this.usersService.update(username, payload);

      return {
        message: 'Successfully updated user data',
        status: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:username')
  async delete(@Param('username') username: string): Promise<responseType> {
    try {
      const data = await this.usersService.delete(username);

      return {
        message: 'Successfully deleted user data',
        status: HttpStatus.ACCEPTED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
