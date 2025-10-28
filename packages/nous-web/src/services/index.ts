import { AdminService } from './AdminService';
import { UserService } from './UserService';
import { BooksService } from './BooksService';
import { LoansService } from './LoansService';

export const api = {
  admin: AdminService,
  user: UserService,
  books: BooksService,
  loans: LoansService,
};