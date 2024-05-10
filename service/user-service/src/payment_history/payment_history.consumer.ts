import { Controller } from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { EventPattern } from '@nestjs/microservices';
import { PaymentHistory } from './payment_history.model';

@Controller()
export class PaymentHistoryConsumer {
  constructor(private readonly historyService: PaymentHistoryService) {}

  @EventPattern('add.history_transaction')
  async createHistory({
    amount,
    status,
    type,
    id_transaction,
    account_number,
  }: Partial<PaymentHistory>) {
    await this.historyService.create({
      amount,
      status,
      type,
      id_transaction,
      account_number,
    });
  }
}
