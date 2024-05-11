import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from '../users.service';
import { Users } from '../users.model';
import { PaymentAccount } from '../../payment_account/payment_account.model';

describe('Users Service Test', () => {
  let userService: UsersService;
  let testData: Users;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: 5432,
          username: 'postgres',
          password: process.env.DB_PASSWORD,
          database: 'finance',
          models: [Users, PaymentAccount],
          autoLoadModels: true,
        }),

        /**
         * other modules
         */
        UsersModule,
      ],
    }).compile();

    userService = app.get<UsersService>(UsersService);
  });

  beforeEach(async () => {
    testData = await userService.add({
      name: 'Muhammad Nur Rahman',
      email: 'test@gmail.com',
      password: 'supersecret',
    });
  });

  afterEach(async () => {
    if (testData) {
      await userService.delete(testData.username);
    }
  });

  test('findAll() - get all user data', async () => {
    const data = await userService.findAll({ page: 1, limit: 25 });

    expect(data).toHaveProperty('data');
    expect(data).toHaveProperty('metadata');
  });

  test('find() - Get users by username', async () => {
    const data = await userService.find(testData.username);

    expect(data).toHaveProperty('name', 'Muhammad Nur Rahman');
    expect(data).toHaveProperty('email', 'test@gmail.com');
  });

  test('findByEmail() - Get users by email', async () => {
    const data = await userService.findByEmail(testData.email);

    expect(data).toHaveProperty('name', 'Muhammad Nur Rahman');
    expect(data).toHaveProperty('email', 'test@gmail.com');
  });

  test('add() - adding new user data', async () => {
    const data = await userService.add({
      name: 'Muhammad Nur Rahman',
      email: 'test2@gmail.com',
      password: 'supersecret',
    });

    expect(data).toHaveProperty('email', 'test2@gmail.com');

    await userService.delete(data.username);
  });

  test('update() - update user data, only name and password are allowed to be edited', async () => {
    const data = await userService.update(testData.username, {
      name: 'Fulan',
    });

    expect(data).toHaveProperty('name', 'Fulan');
  });

  test('delete() - delete user data', async () => {
    const dataForDelete = await userService.add({
      name: 'Muhammad Nur Rahman',
      email: 'test2@gmail.com',
      password: 'supersecret',
    });

    const data = await userService.delete(dataForDelete.username);

    expect(data).toHaveProperty('email', 'test2@gmail.com');
  });
});
