import { ObjectId } from 'mongodb';

export type User = {
  _id?: ObjectId;
  name: string;
  phoneNumber: string;
  chatId: string;
  email: string;
  creationTimestamp: number;
};

export type Transaction = {
  _id?: ObjectId;
  userId: ObjectId;
  value: number;
  type: 'income' | 'expense';
  category: string;
  timestamp: number;
  name: string;
  description?: string;
};
