import { isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class newMessageCreatedDTO {
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
