import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: 'hashedpassword', description: 'The password of the user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'user', description: 'The role of the user' })
  @Prop({ required: true, default: 'user' })
  role: string;

  @ApiProperty({ example: '2025-02-11T00:00:00.000Z', description: 'The registered date of the user' })
  @Prop({ default: Date.now })
  registeredDate: Date;

  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ example: 'active', description: 'The status of the user' })
  @Prop({ default: 'active' })
  status: string;

  @ApiProperty({ example: [], description: 'The borrowed books of the user' })
  @Prop({ default: [] })
  borrowedBooks: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);