import type { Book } from '../models';

export type ListBooksResponse = Book[];

export interface RegisterBookBody {
  title: string;
  author: string;
  genre?: string;
  imageUrl?: string;
  basePrice: number;
}

export type RegisterBookResponse = Book;