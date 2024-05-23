import { IpaymentHistory } from "@/interface/payment_history";
import { GetDataApi } from "@/utils/fetcher";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";

export default async function HistoryTransaction({
  account_number,
}: {
  account_number: string;
}) {
  const { data }: IpaymentHistory = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/api/payment-history/${account_number}`
  );

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold text-primary-600">
        Transaction History
      </h2>
      {data && data.length > 0 ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center font-medium text-primary-600">
            <span>Time</span>
            <span>Status</span>
            <span>Type</span>
            <span>Amount</span>
          </div>
          {data.map((history, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-2 border-b last:border-none bg-secondary"
            >
              <span>{formatDate(history.createdAt)}</span>
              <span>
                {history.status === "success" ? (
                  <p className="bg-green-50 p-1 text-green-600">Success</p>
                ) : (
                  <p className="bg-red-50 p-1 text-red-600">Success</p>
                )}
              </span>
              <span>{history.type}</span>
              <span>
                {history.type === "sender" ? (
                  <p className="text-red-500">
                    - {formatCurrency(Number(history.amount))}
                  </p>
                ) : (
                  <p className="text-green-500">
                    + {formatCurrency(Number(history.amount))}
                  </p>
                )}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>No Transactions</p>
      )}
    </div>
  );
}
