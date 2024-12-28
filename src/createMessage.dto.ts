import { IsNotEmpty, IsString } from 'class-validator';

export class NewMessageCreatedDTO {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
