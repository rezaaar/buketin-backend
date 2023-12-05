import { Document } from 'mongoose';

export interface ITransaction extends Document {
  readonly item: string;
  readonly buyer_name: string;
  readonly buyer_wa: string;
  readonly buyer_address: string;
  readonly greeting_card_id: string;
  readonly total_price: number;
  readonly status: string;
  readonly receiver_name: string;
  readonly receiver_address: string;
  readonly receiver_wa: string;
}
