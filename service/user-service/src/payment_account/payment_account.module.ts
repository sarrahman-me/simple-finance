import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentAccount } from './payment_account.model';
import { PaymentAccountService } from './payment_account.service';
import { PaymentAccountController } from './payment_account.controller';
import { GeneratorModule } from '../generator/generator.module';
import { Users } from '../users/users.model';

@Module({
  imports: [
    SequelizeModule.forFeature([PaymentAccount, Users]),
    GeneratorModule,
  ],
  providers: [PaymentAccountService],
  controllers: [PaymentAccountController],
  exports: [PaymentAccountService],
})
export class PaymentAccountModule {}
