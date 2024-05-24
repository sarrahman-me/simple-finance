import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum PaymentStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILED = 'failed',
}

enum TransactionType {
  INTERBANK = 'interbank',
  INTERPOCKET = 'interpocket',
}

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop()
  id_transaction: string;

  @Prop({ type: String, enum: Object.values(TransactionType) })
  transaction_type: TransactionType;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: String, enum: Object.values(PaymentStatus) })
  status: PaymentStatus;

  @Prop()
  description: string;

  @Prop()
  from_currency: string;

  @Prop()
  to_currency: string;

  @Prop()
  from_pocket: string;

  @Prop()
  to_pocket: string;

  @Prop()
  from_address: string;

  @Prop()
  to_address: string;

  @Prop()
  timestamp: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
