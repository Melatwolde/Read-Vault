import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { GoogleBooksService } from './google-books.service';

@Injectable()
export class BooksService {
  addBook(bookData: any, coverImage: Express.Multer.File) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private readonly googleBooksService: GoogleBooksService,
  ) {}

  async getTotalBooks(): Promise<number> {
    return this.bookModel.countDocuments().exec();
  }

  async getActiveMembers(): Promise<number> {
    // Implement logic to count active members
    // This is a placeholder implementation
    return 500000;
  }

  async getOngoingLoans(): Promise<number> {
    return this.bookModel.countDocuments({ available: false }).exec();
  }

  async getMostBorrowedBook(): Promise<Book> {
    const mostBorrowedBook = await this.bookModel.findOne().sort({ borrowedCount: -1 }).exec();
    if (!mostBorrowedBook) {
      throw new Error('No books found');
    }
    return mostBorrowedBook;
  }

  async getDashboardData() {
    const totalBooks = await this.getTotalBooks();
    const activeMembers = await this.getActiveMembers();
    const ongoingLoans = await this.getOngoingLoans();
    const mostBorrowedBook = await this.getMostBorrowedBook();

    return [
      { label: 'Total Books', value: totalBooks.toString(), icon: '/icons/books.png' },
      { label: 'Active Members', value: activeMembers.toString(), icon: '/icons/members.png' },
      { label: 'Ongoing Loans', value: ongoingLoans.toString(), icon: '/icons/loans.png' },
      { label: 'Most Borrowed Book', value: mostBorrowedBook.title, icon: '/icons/most-borrowed.png' },
    ];
  }

  async fetchAndSaveBooks(query: string) {
    const books = await this.googleBooksService.fetchBooks(query).toPromise();
    const bookDocuments = books.map(book => ({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
      genre: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown',
      available: true,
      borrowedCount: 0,
    }));
    return this.bookModel.insertMany(bookDocuments);
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getLoanTrends(): Promise<any> {
    const books = await this.bookModel.find().exec();
    const loanTrends = books.map(book => book.loanTrends).flat();
    return loanTrends;
  }

  async addLoanTrend(bookId: string, loanTrend: { date: string; booksLoaned: number; booksReturned: number; overdueBooks: number }): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(
      bookId,
      { $push: { loanTrends: loanTrend } },
      { new: true, useFindAndModify: false }
    ).exec();
  }
}