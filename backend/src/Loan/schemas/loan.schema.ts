import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Loan extends Document {
  @Prop({ required: true })
  SL_NO: string;

  @Prop({ required: true })
  book: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  lendingMoney: string;

  @Prop({ required: true })
  status: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);