import { Controller, Get, Query, Post, Param, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { Express } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('dashboard-data')
  async getDashboardData() {
    return this.booksService.getDashboardData();
  }

  @Get('fetch-books')
  async fetchBooks(@Query('query') query: string) {
    return this.booksService.fetchAndSaveBooks(query);
  }

  @Get('all-books')
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('loan-trends')
  async getLoanTrends() {
    return this.booksService.getLoanTrends();
  }

  @Post('loan-trends/:bookId')
  async addLoanTrend(@Param('bookId') bookId: string, @Body() loanTrend: { date: string; booksLoaned: number; booksReturned: number; overdueBooks: number }) {
    return this.booksService.addLoanTrend(bookId, loanTrend);
  }

  @Post()
  @UseInterceptors(FileInterceptor('coverImage'))
  async addBook(@Body() bookData: any, @UploadedFile() coverImage: Express.Multer.File) {
    return this.booksService.addBook(bookData, coverImage);
  }
}