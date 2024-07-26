export interface IAccountCheck {
  message: string;
  statusCode: number;
  data: {
    account_number: string;
    pic: string;
  };
}
