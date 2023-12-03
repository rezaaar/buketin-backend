import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Occasion {
  @Prop()
  name: string;
}

export const OccasionSchema = SchemaFactory.createForClass(Occasion);
