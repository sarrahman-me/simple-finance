import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { PaymentAccountModule } from './payment_account/payment_account.module';
import { PaymentAccount } from './payment_account/payment_account.model';
import { PaymentHistoryModule } from './payment_history/payment_history.module';
import { PaymentHistory } from './payment_history/payment_history.model';

@Module({
  imports: [
    /**
     * module configuration .env
     */
    ConfigModule.forRoot(),

    /**
     * ORM Sequelize
     */
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'tokokeramik',
      models: [Users, PaymentAccount, PaymentHistory],
      autoLoadModels: true,
    }),

    /**
     * rate limiter
     */
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute (60000 milliseconds)
        limit: 60, // 60 requests per ttl (1 minute)
      },
    ]),

    /**
     * other modules
     */
    UsersModule,
    PaymentAccountModule,
    PaymentHistoryModule,
  ],
  providers: [
    /**
     * global rate limiter configuration
     */
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
