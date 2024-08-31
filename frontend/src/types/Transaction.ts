import { Category, User } from "./.";

export interface Transaction {
  id: number;
  transactionValue: number;
  userDataId: User;
  description: string;
  date: string;
  transactionType: string;
  idCategory: Category;
}
