import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReceiverTransactionDto {
  @IsNotEmpty()
  @IsString()
  readonly receiver_name: string;

  @IsNotEmpty()
  @IsString()
  readonly receiver_address: string;

  @IsNotEmpty()
  @IsString()
  readonly receiver_wa: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
