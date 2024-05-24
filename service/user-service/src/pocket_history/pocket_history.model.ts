import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pocket } from 'src/pocket/pocket.model';

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
export class PocketHistory extends Model<PocketHistory> {
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

  @ForeignKey(() => Pocket)
  @Column
  id_pocket: string;

  // relationship

  @BelongsTo(() => Pocket)
  pocket: Pocket;
}
