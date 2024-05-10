import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/users/users.model';
import { AuthGuard } from './auth.guard';

interface responseType {
  message: string;
  status: number;
  data: any;
}

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register({
    name,
    email,
    password,
  }: Partial<Users>): Promise<responseType> {
    if (!name || !email || !password) {
      throw new BadRequestException('incomplete data');
    }

    try {
      const data = await this.authService.register({
        name,
        email,
        password,
      });

      return {
        message: 'registration successful',
        status: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login({ email, password }: Partial<Users>): Promise<responseType> {
    if (!email || !password) {
      throw new BadRequestException('incomplete data');
    }

    try {
      const data = await this.authService.register({
        email,
        password,
      });

      return {
        message: 'Signed in successfully',
        status: HttpStatus.CREATED,
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
      };
    },
  ) {
    try {
      return {
        message: 'Successfully Get logged in user',
        status: HttpStatus.OK,
        data: req.user,
      };
    } catch (error) {
      throw error;
    }
  }
}