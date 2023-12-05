import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { GreetingCard } from './greeting-card.schema';

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  item: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GreetingCard' })
  greeting_card_id: GreetingCard;

  @Prop()
  total_price: number;

  @Prop()
  buyer_name: string;

  @Prop()
  buyer_wa: string;

  @Prop()
  buyer_address: string;

  @Prop()
  receiver_name: string;

  @Prop()
  receiver_address: string;

  @Prop()
  receiver_wa: string;

  @Prop()
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
