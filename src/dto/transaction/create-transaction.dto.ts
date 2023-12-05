import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  readonly item: string;

  @IsNotEmpty()
  @IsString()
  readonly greeting_card_id: string;

  @IsNotEmpty()
  @IsNumber()
  readonly total_price: number;

  @IsNotEmpty()
  @IsString()
  readonly buyer_name: string;

  @IsNotEmpty()
  @IsString()
  readonly buyer_wa: string;

  @IsNotEmpty()
  @IsString()
  readonly buyer_address: string;

  @IsString()
  readonly receiver_name: string;

  @IsString()
  readonly receiver_address: string;

  @IsString()
  readonly receiver_wa: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
