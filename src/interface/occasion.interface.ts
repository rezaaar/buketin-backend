import { Document } from 'mongoose';

export interface IOccasion extends Document {
  readonly name: string;
}
