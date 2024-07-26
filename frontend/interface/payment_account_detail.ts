export interface IPaymentAccountDetail {
  message: string;
  statusCode: number;
  data: {
    account_number: string;
    name: string;
    balance: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    user: {
      name: string;
      username: string;
      email: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
