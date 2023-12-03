import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Occasion } from './occasion.schema';
import * as mongoose from 'mongoose';
@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Occasion' }] })
  occasion: Occasion[];

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
