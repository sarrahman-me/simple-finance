import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PaymentAccount } from '../payment_account/payment_account.model';

enum PaymentStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILED = 'failed',
}

enum TransactionType {
  RECEIVER = 'receiver',
  SENDER = 'sender',
}

@Table
export class PaymentHistory extends Model<PaymentHistory> {
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  amount: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
  })
  status: string;

  @Column({
    type: DataType.ENUM(...Object.values(TransactionType)),
  })
  type: string;

  @Column
  id_transaction: string;

  @ForeignKey(() => PaymentAccount)
  @Column
  account_number: string;

  // relationship

  @BelongsTo(() => PaymentAccount)
  paymentAccount: PaymentAccount;
}
