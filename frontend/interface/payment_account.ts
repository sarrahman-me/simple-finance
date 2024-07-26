export interface IPaymentAccount {
  message: string;
  statusCode: number;
  data: {
    account_number: string;
    name: string;
    balance: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
