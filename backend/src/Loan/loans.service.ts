import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan } from './schemas/loan.schema';

@Injectable()
export class LoansService {
  constructor(@InjectModel(Loan.name) private loanModel: Model<Loan>) {}

  async getAllLoans(): Promise<Loan[]> {
    return this.loanModel.find().exec();
  }

  async addLoan(loanData: any): Promise<Loan> {
    const newLoan = new this.loanModel(loanData);
    return newLoan.save();
  }

  async updateLoanStatus(loanId: string, status: string): Promise<Loan> {
    const updatedLoan = await this.loanModel.findByIdAndUpdate(loanId, { status }, { new: true }).exec();
    if (!updatedLoan) {
      throw new NotFoundException('Loan not found');
    }
    return updatedLoan;
  }

  async removeLoan(loanId: string): Promise<Loan> {
    const deletedLoan = await this.loanModel.findByIdAndDelete(loanId).exec();
    if (!deletedLoan) {
      throw new NotFoundException('Loan not found');
    }
    return deletedLoan;
  }
}