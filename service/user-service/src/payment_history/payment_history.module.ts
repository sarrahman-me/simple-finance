import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentHistory } from './payment_history.model';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistoryController } from './payment_history.controller';
import { PaymentAccountModule } from '../payment_account/payment_account.module';
import { PaymentHistoryConsumer } from './payment_history.consumer';

@Module({
  imports: [SequelizeModule.forFeature([PaymentHistory]), PaymentAccountModule],
  providers: [PaymentHistoryService],
  controllers: [PaymentHistoryController, PaymentHistoryConsumer],
})
export class PaymentHistoryModule {}
