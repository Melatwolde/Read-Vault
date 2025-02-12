import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  readonly status?: string;
  readonly borrowedBooks?: any[];
  readonly registeredDate?: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty({ description: 'The username of the user' })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: string;
}