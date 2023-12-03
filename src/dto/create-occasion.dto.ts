import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOccasionDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
