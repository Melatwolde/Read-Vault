import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  available: boolean;

  @Prop({ default:0 })
  borrowedCount: number;

  @Prop({ type: [{date:String, booksLoaned: Number, booksReturned: Number, overdueBooks: Number}] })
  loanTrends: { date: string; booksLoaned: number; booksReturned: number; overdueBooks: number }[];
}

export const BookSchema = SchemaFactory.createForClass(Book);