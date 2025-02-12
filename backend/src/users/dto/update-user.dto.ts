import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'The username of the user' })
  readonly username?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false, description: 'The email of the user' })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'The password of the user' })
  readonly password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: 'The role of the user' })
  readonly role?: string;
}