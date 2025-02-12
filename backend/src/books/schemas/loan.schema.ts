import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Book } from './book.schema';

export type LoanDocument = Loan & Document;

@Schema()
export class Loan {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop({ required: true })
  loanDate: Date;

  @Prop({ required: true })
  returnDate: Date;

  @Prop({ required: true })
  returned: boolean;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);