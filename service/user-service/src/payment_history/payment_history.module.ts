import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentHistory } from './payment_history.model';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistoryController } from './payment_history.controller';

@Module({
  imports: [SequelizeModule.forFeature([PaymentHistory])],
  providers: [PaymentHistoryService],
  controllers: [PaymentHistoryController],
})
export class PaymentHistoryModule {}
