import { Document } from 'mongoose';

export interface IGreetingCard extends Document {
  readonly receiver_name: string;
  readonly sender_name: string;
  readonly message: string;
}
