import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GeneratorModule } from '../generator/generator.module';
import { PaymentAccountModule } from 'src/payment_account/payment_account.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
    PaymentAccountModule,
    GeneratorModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
