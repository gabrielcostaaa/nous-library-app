
export type Role = "ADMIN" | "USER";
export type LoanStatus = "ACTIVE" | "OVERDUE" | "RETURNED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  imageUrl: string | null;
  basePrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  userId: string;
  bookId: string;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  status: LoanStatus;
  fineDiscountApplied: boolean;
  createdAt: string;
  updatedAt: string;
}