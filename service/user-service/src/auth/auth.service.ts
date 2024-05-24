import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * register user data through authentication
   * @param {name: string, email: string, password: string} payload
   * @returns newly registered user
   */

  async register({ name, email, password }: Partial<Users>): Promise<Users> {
    try {
      const userRegistered = await this.userService.add({
        name,
        email,
        password,
      });

      return userRegistered;
    } catch (error) {
      throw error;
    }
  }

  /**
   * registered user login method
   * ?(1) why do I give "email and password is invalid" for all validation errors? because it is to trick people who guess so that they don't know which one is wrong
   * @param {email: string, password: string} payload
   * @returns access_token and user data
   */

  async login({ email, password }: Partial<Users>): Promise<{
    access_token: string;
    user: {
      name: string;
      username: string;
      email: string;
    };
  }> {
    try {
      // check user data
      const existingUser = await this.userService.findByEmail(email);

      if (!existingUser) {
        throw new UnauthorizedException('Email or Password is invalid'); //?(1)
      }

      // Check whether the password matches the password in the database
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        throw new UnauthorizedException('Email or Password is invalid'); //?(1)
      }

      // applies user data stored in the token
      const payload = {
        name: existingUser.name,
        username: existingUser.username,
        email,
        account_number: existingUser.payment_account.account_number,
      };

      // generate jwt token
      const access_token = await this.jwt.signAsync(payload, {
        expiresIn: '1 days',
      });

      return {
        access_token,
        user: payload,
      };
    } catch (error) {
      throw error;
    }
  }
}
