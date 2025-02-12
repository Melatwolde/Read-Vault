import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class GoogleBooksService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private readonly httpService: HttpService) {}

  fetchBooks(query: string) {
    return this.httpService
      .get(`${this.apiUrl}?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`)
      .pipe(map((response: any) => response.data.items));
  }
}