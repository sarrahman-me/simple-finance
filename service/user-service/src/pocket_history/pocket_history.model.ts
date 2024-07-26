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

enum RoleType {
  RECEIVER = 'receiver',
  SENDER = 'sender',
}

enum TransactionType {
  INTERBANK = 'interbank',
  INTERPOCKET = 'interpocket',
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
    type: DataType.ENUM(...Object.values(RoleType)),
  })
  type: string;

  @Column({
    type: DataType.ENUM(...Object.values(TransactionType)),
  })
  transaction_type: string;

  @Column
  id_transaction: string;

  @Column
  account_number: string;

  @ForeignKey(() => Pocket)
  @Column
  id_pocket: string;

  // relationship

  @BelongsTo(() => Pocket)
  pocket: Pocket;
}
