import type { Loan } from '../models';

export type ListLoansResponse = Loan[];

export interface RegisterLoanBody {
  userId: string;
  bookId: string;
  dueDate: string;
}

export type RegisterLoanResponse = Loan;