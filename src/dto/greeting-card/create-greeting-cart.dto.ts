import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGreetingCardDto {
  @IsNotEmpty()
  @IsString()
  readonly receiver_name: string;

  @IsNotEmpty()
  @IsString()
  readonly sender_name: string;

  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
