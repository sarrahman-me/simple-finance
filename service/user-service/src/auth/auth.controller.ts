import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/users/users.model';
import { AuthGuard } from './auth.guard';

interface responseType {
  message: string;
  statusCode: number;
  data?: any;
}

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body()
    { name, email, password }: Partial<Users>,
  ): Promise<responseType> {
    if (!name || !email || !password) {
      throw new BadRequestException('incomplete data');
    }

    try {
      await this.authService.register({
        name,
        email,
        password,
      });

      return {
        message: 'registration successful',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(
    @Body() { email, password }: Partial<Users>,
  ): Promise<responseType> {
    if (!email || !password) {
      throw new BadRequestException('incomplete data');
    }

    try {
      const data = await this.authService.login({
        email,
        password,
      });

      return {
        message: 'Signed in successfully',
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(
    @Request()
    req: {
      user: {
        name: string;
        username: string;
        email: string;
        account_number: string;
      };
    },
  ) {
    try {
      return {
        message: 'Successfully Get logged in user',
        statusCode: HttpStatus.OK,
        data: req.user,
      };
    } catch (error) {
      throw error;
    }
  }
}
