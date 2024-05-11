import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentAccount } from '../../payment_account/payment_account.model';
import { Users } from '../../users/users.model';
import { UsersService } from '../../users/users.service';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PaymentAccountService } from '../../payment_account/payment_account.service';
import { PaymentAccountModule } from '../../payment_account/payment_account.module';
import { PaymentHistoryModule } from '../payment_history.module';
import { PaymentHistory } from '../payment_history.model';
import { PaymentHistoryService } from '../payment_history.service';

describe('Payment History Service Test', () => {
  let paymentAccout: PaymentAccountService;
  let testDataAccount: PaymentAccount;

  let userService: UsersService;
  let testDataUser: Users;

  let paymentHistory: PaymentHistoryService;

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
          models: [Users, PaymentAccount, PaymentHistory],
          autoLoadModels: true,
        }),

        /**
         * other modules
         */
        PaymentHistoryModule,
        PaymentAccountModule,
        UsersModule,
      ],
    }).compile();

    paymentHistory = app.get<PaymentHistoryService>(PaymentHistoryService);
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

  test('findAllByPaymentAccount() - get all historical data based on payment accounts by pagination', async () => {
    const data = await paymentHistory.findAllByPaymentAccount(
      testDataAccount.account_number,
      {
        page: 1,
        limit: 25,
      },
    );

    expect(data).toBeDefined();
  });

  // test('create() - create a new transaction history', async () => {
  //   const data = await paymentHistory.create({
  //     amount: 10,
  //     status: 'success',
  //     type: 'sender',
  //     id_transaction: 'example-id-transaction-dummy',
  //     account_number: testDataAccount.account_number,
  //   });

  //   expect(data).toHaveProperty('amount');
  //   expect(data).toHaveProperty('status', 'success');
  //   expect(data).toHaveProperty('type', 'sender');
  //   expect(data).toHaveProperty(
  //     'id_transaction',
  //     'example-id-transaction-dummy',
  //   );
  //   expect(data).toHaveProperty(
  //     'account_number',
  //     testDataAccount.account_number,
  //   );
  // });
});
