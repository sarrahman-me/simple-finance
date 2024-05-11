import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentAccount } from '../../payment_account/payment_account.model';
import { PaymentAccountService } from '../payment_account.service';
import { PaymentAccountModule } from '../payment_account.module';
import { Users } from '../../users/users.model';
import { UsersService } from '../../users/users.service';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';

describe('Users Service Test', () => {
  let paymentAccout: PaymentAccountService;
  let testDataAccount: PaymentAccount;
  let userService: UsersService;
  let testDataUser: Users;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
        }),
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
        PaymentAccountModule,
        UsersModule,
      ],
    }).compile();

    paymentAccout = app.get<PaymentAccountService>(PaymentAccountService);
    userService = app.get<UsersService>(UsersService);
  });

  beforeEach(async () => {
    testDataUser = await userService.add({
      name: 'Muhammad Nur Rahman',
      email: 'test@gmail.com',
      password: 'supersecret',
    });
    testDataAccount = await paymentAccout.add(
      'Bank BCA',
      testDataUser.username,
    );
  });

  afterEach(async () => {
    if (testDataAccount) {
      await paymentAccout.delete(
        testDataAccount.account_number,
        testDataUser.username,
      );
    }
    if (testDataUser) {
      await userService.delete(testDataUser.username);
    }
  });

  test('findAllByUsername() - get all payment accounts based on the owner username', async () => {
    const data = await paymentAccout.findAllByUsername(testDataUser.username);

    expect(data).toBeDefined();
  });

  test('findByUsernameAndAccountNumber() - Get payment account data based on matching username and account number', async () => {
    const data = await paymentAccout.findByUsernameAndAccountNumber(
      testDataUser.username,
      testDataAccount.account_number,
    );

    expect(data).toHaveProperty(
      'account_number',
      testDataAccount.account_number,
    );
    expect(data).toHaveProperty('name', 'Bank BCA');
    expect(data).toHaveProperty('balance');
  });

  test('findByAccountNumber() - get payment account based on account number', async () => {
    const data = await paymentAccout.findByAccountNumber(
      testDataAccount.account_number,
    );

    expect(data).toHaveProperty(
      'account_number',
      testDataAccount.account_number,
    );
  });

  test('add() - create a new payment account', async () => {
    const data = await paymentAccout.add('Bank JAGO', testDataUser.username);

    expect(data).toHaveProperty('name', 'Bank JAGO');
    expect(data).toHaveProperty('username', testDataUser.username);

    await paymentAccout.delete(data.account_number, testDataUser.username);
  });

  test('update() - update payment account data, only name and balance are allowed to be edited', async () => {
    const data = await paymentAccout.update(testDataAccount.account_number, {
      balance: 100,
    });

    expect(data).toHaveProperty('balance', '100.00');

    //returns the balance to 0 so it can be deleted
    await paymentAccout.update(testDataAccount.account_number, {
      balance: 0,
    });
  });

  test('delete() - delete payment account data', async () => {
    const dataToDelete = await paymentAccout.add(
      'Bank JAGO',
      testDataUser.username,
    );

    const data = await paymentAccout.delete(
      dataToDelete.account_number,
      testDataUser.username,
    );

    expect(data).toHaveProperty('name', 'Bank JAGO');
  });
});
