import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { PaymentAccount } from 'src/payment_account/payment_account.model';

@Table
export class Pocket extends Model<Pocket> {
  @PrimaryKey
  @Unique
  @Column
  id_pocket: string;

  @Column
  name: string;

  @Column
  color: string;

  @Default(0.0)
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  balance: number;

  @ForeignKey(() => PaymentAccount)
  @Column
  account_number: string;

  // relationship

  @BelongsTo(() => PaymentAccount)
  payment_account: PaymentAccount;
}
