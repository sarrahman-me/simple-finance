import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneratorModule } from '../generator/generator.module';
import { PocketService } from './pocket.service';
import { PocketController } from './pocket.controller';
import { Pocket } from './pocket.model';
import { PaymentAccount } from 'src/payment_account/payment_account.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Pocket, PaymentAccount]),
    GeneratorModule,
  ],
  providers: [PocketService],
  controllers: [PocketController],
  exports: [PocketService],
})
export class PocketModule {}
