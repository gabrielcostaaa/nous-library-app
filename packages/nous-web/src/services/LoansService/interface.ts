export type LoanStatus = "ACTIVE" | "OVERDUE" | "RETURNED";

export interface ListLoansItem {
  id: string;
  userId: string;
  bookId: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string | null;
  status: LoanStatus;
  fineDiscountApplied: boolean;
  createdAt: string;
  updatedAt: string;
  user: { id: string; name: string };
  book: { id: string; title: string };
}

export type ListLoansResponse = ListLoansItem[];

export interface RegisterLoanBody {
  userId: string;
  bookId: string;
  dueDate: string;
}

export type RegisterLoanResponse = ListLoansItem;
