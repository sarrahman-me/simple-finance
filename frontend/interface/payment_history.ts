export interface IpaymentHistory {
  message: string;
  statusCode: number;
  data: {
    id: number;
    amount: string;
    status: string;
    type: string;
    id_transaction: string;
    account_number: string;
    createdAt: string;
    updatedAt: string;
  }[];
  metadata: {
    limit: number;
    page: number;
    totalData: number;
    totalPages: number;
  };
}
