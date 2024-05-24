import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PocketHistoryService } from './pocket_history.service';
import { PocketHistory } from './pocket_history.model';

@Controller()
export class PocketHistoryConsumer {
  constructor(private readonly historyService: PocketHistoryService) {}

  @EventPattern('add.history_transaction')
  async createHistory({
    amount,
    status,
    type,
    id_transaction,
    id_pocket,
  }: Partial<PocketHistory>) {
    await this.historyService.create({
      amount,
      status,
      type,
      id_transaction,
      id_pocket,
    });
  }
}
