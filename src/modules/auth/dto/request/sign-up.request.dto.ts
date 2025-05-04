import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignUpBodyDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
