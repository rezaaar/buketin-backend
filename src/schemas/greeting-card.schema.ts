import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class GreetingCard {
  @Prop()
  receiver_name: string;

  @Prop()
  sender_name: string;

  @Prop()
  message: string;
}

export const GreetingCardSchema = SchemaFactory.createForClass(GreetingCard);
