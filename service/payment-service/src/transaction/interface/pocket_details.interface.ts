export interface IPocketDetails {
  message: string;
  statusCode: 200;
  data: {
    id_pocket: string;
    name: string;
    color: string;
    balance: string;
    account_number: string;
    createdAt: string;
    updatedAt: string;
    payment_account: {
      account_number: string;
      pic: string;
      pin: string;
      currency: string;
      username: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
