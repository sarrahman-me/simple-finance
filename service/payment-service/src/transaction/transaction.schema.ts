import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum PaymentStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAILED = 'failed',
}

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: Number })
  amount: number;

  @Prop({ type: String, enum: Object.values(PaymentStatus) })
  status: PaymentStatus;

  @Prop()
  currency: string;

  @Prop()
  description: string;

  @Prop()
  from_address: string;

  @Prop()
  to_address: string;

  @Prop()
  timestamp: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
