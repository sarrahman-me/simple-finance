import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pocket } from 'src/pocket/pocket.model';
import { PocketHistory } from './pocket_history.model';
import { PocketHistoryService } from './pocket_history.service';
import { PocketHistoryController } from './pocket_history.controller';
import { PocketHistoryConsumer } from './pocket_history.consumer';

@Module({
  imports: [SequelizeModule.forFeature([PocketHistory, Pocket])],
  providers: [PocketHistoryService],
  controllers: [PocketHistoryController, PocketHistoryConsumer],
})
export class PocketHistoryModule {}
