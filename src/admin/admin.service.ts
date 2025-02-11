import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../books/schemas/book.schema';
import { Loan, LoanDocument } from '../books/schemas/loan.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Loan.name) private loanModel: Model<LoanDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getTotalBooks(): Promise<{ available: number; borrowed: number }> {
    const available = await this.bookModel.countDocuments({ available: true });
    const borrowed = await this.bookModel.countDocuments({ available: false });
    return { available, borrowed };
  }

  async getMostBorrowedBooks(): Promise<Book[]> {
    return this.loanModel.aggregate([
      { $group: { _id: '$book', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'book' } },
      { $unwind: '$book' },
      { $project: { _id: 0, title: '$book.title', count: 1 } },
    ]);
  }

  async getLoanTrends(): Promise<any[]> {
    return this.loanModel.aggregate([
      { $group: { _id: { $month: '$loanDate' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
  }

  async getOverdueVsReturned(): Promise<{ overdue: number; returned: number }> {
    const overdue = await this.loanModel.countDocuments({ returned: false, returnDate: { $lt: new Date() } });
    const returned = await this.loanModel.countDocuments({ returned: true });
    return { overdue, returned };
  }

  async getActiveMembersPerMonth(): Promise<any[]> {
    return this.loanModel.aggregate([
      { $group: { _id: { $month: '$loanDate' }, users: { $addToSet: '$user' } } },
      { $project: { _id: 1, activeMembers: { $size: '$users' } } },
      { $sort: { _id: 1 } },
    ]);
  }

  async getLoanCountPerMonth(): Promise<any[]> {
    return this.loanModel.aggregate([
      { $group: { _id: { $month: '$loanDate' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
  }

  async getMostPopularGenres(): Promise<any[]> {
    return this.loanModel.aggregate([
      { $lookup: { from: 'books', localField: 'book', foreignField: '_id', as: 'book' } },
      { $unwind: '$book' },
      { $group: { _id: '$book.genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getAverageLoanDuration(): Promise<number> {
    const result = await this.loanModel.aggregate([
      { $match: { returned: true } },
      { $project: { duration: { $subtract: ['$returnDate', '$loanDate'] } } },
      { $group: { _id: null, avgDuration: { $avg: '$duration' } } },
    ]);
    return result[0]?.avgDuration || 0;
  }

  async getLateReturnsPerMember(): Promise<any[]> {
    return this.loanModel.aggregate([
      { $match: { returned: false, returnDate: { $lt: new Date() } } },
      { $group: { _id: '$user', count: { $sum: 1 } } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 0, username: '$user.username', count: 1 } },
    ]);
  }
}