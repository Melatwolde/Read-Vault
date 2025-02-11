import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}