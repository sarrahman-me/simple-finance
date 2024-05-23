import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentHistory } from './payment_history.model';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistoryController } from './payment_history.controller';
import { PaymentHistoryConsumer } from './payment_history.consumer';
import { Pocket } from 'src/pocket/pocket.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentHistory, Pocket])],
  providers: [PaymentHistoryService],
  controllers: [PaymentHistoryController, PaymentHistoryConsumer],
})
export class PaymentHistoryModule {}
