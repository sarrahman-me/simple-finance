import {
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { PaymentAccount } from '../payment_account/payment_account.model';

@Table
export class Users extends Model<Users> {
  @Column
  name: string;

  @PrimaryKey
  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  // relationship
  @HasOne(() => PaymentAccount, { onDelete: 'CASCADE' })
  payment_account: PaymentAccount;
}
