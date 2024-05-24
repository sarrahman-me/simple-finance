import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Users } from '../users/users.model';

@Table
export class PaymentAccount extends Model<PaymentAccount> {
  @PrimaryKey
  @Unique
  @Column
  account_number: string;

  @Column
  pic: string;

  @Column
  pin: string;

  @Column
  currency: string;

  @ForeignKey(() => Users)
  @Column
  username: string;

  // relationship

  @BelongsTo(() => Users)
  user: Users;
}
