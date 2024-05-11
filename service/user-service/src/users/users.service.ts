import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import validator from 'validator';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { GeneratorService } from '../generator/generator.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly usersModel: typeof Users,

    private readonly generator: GeneratorService,
  ) {}

  /**
   * get all user data using pagination
   * @returns all users
   */

  async findAll({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{
    data: Users[];
    metadata: {
      page: number;
      limit: number;
      totalData: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    // use search keywords, only if they exist
    if (search) {
      whereClause = {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.usersModel.findAndCountAll({
      offset,
      limit,
      where: whereClause,
    });

    // calculate total data and pages
    const totalData = count;
    const totalPages = Math.ceil(totalData / limit);

    return {
      data: rows,
      metadata: {
        limit,
        page,
        totalData,
        totalPages,
      },
    };
  }

  /**
   * Get users by username
   * @param {string} username primary key
   * @returns appropriate user
   */

  async find(username: string): Promise<Users> {
    const data = await this.usersModel.findByPk(username);

    if (!data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  /**
   * Get users by email
   * @param email
   * @returns appropriate user
   */

  async findByEmail(email: string): Promise<Users> {
    return this.usersModel.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * adding new user data
   * @param payload
   * @returnsnewly added data
   */

  async add(payload: Partial<Users>): Promise<Users> {
    const { name, email, password } = payload;

    // validate email format
    if (!validator.isEmail(email)) {
      throw new BadRequestException('invalid email');
    }

    // Check whether the email has been used
    const existingEmail = await this.usersModel.findOne({
      where: {
        email,
      },
    });

    if (existingEmail) {
      throw new ConflictException('email is already in use');
    }

    // generate unique username from email
    const username = this.generator.usernameFromEmail(email);

    // hash password
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    // adding data to the database
    return this.usersModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
  }

  /**
   * update user data, only name and password are allowed to be edited
   * @param username primary key
   * @param {name: string, password: string} payload
   * @returns newly updated user
   */

  async update(
    username: string,
    { name, password }: Partial<Users>,
  ): Promise<Users> {
    // check whether the user exists in the database
    const existingUser = await this.usersModel.findByPk(username);

    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    let hashedPassword: string = existingUser.password;

    if (password) {
      // re-hash if password changes
      if (password !== existingUser.password) {
        const salt = await bcrypt.genSalt();

        hashedPassword = await bcrypt.hash(password, salt);
      }
    }

    // make data changes
    await this.usersModel.update(
      {
        name,
        password: hashedPassword,
      },
      {
        where: {
          username,
        },
      },
    );

    return this.usersModel.findByPk(username);
  }

  /**
   * delete user data
   * ? Payment account data for this user is automatically deleted via cascade db
   * @param username primary key
   * @returns deleted user
   */

  async delete(username: string): Promise<Users> {
    // check whether the user exists in the database
    const existingUser = await this.usersModel.findByPk(username);

    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    // delete data from the database
    await this.usersModel.destroy({
      where: {
        username,
      },
    });

    return existingUser;
  }
}
