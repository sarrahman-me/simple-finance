export interface IpaymentHistory {
  amount: number;
  status: "success" | "pending" | "failed";
  type: "receiver" | "sender";
  id_transaction: string;
  account_number: string;
}
