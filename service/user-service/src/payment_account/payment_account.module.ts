import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentAccount } from './payment_account.model';
import { PaymentAccountService } from './payment_account.service';
import { PaymentAccountController } from './payment_account.controller';

@Module({
  imports: [SequelizeModule.forFeature([PaymentAccount])],
  providers: [PaymentAccountService],
  controllers: [PaymentAccountController],
})
export class PaymentAccountModule {}
