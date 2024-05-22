import { IpaymentHistory } from "@/interface/payment_history";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="space-y-20">
        {/* total balance */}
        <div className="space-y-3">
          <h2 className="font-medium">Total Balance</h2>
          <h3 className="font-bold text-2xl">$ 400.00</h3>
        </div>

        {/* recent transaction */}
        <div className="space-y-3">
          <h2 className="font-medium">Recent Transaction</h2>
          <div>
            <HistoryTransaction
              type="receiver"
              status="success"
              amount={1000}
            />
          </div>
        </div>
      </div>
      <div className="space-y-20">
        {/* send again from recently transaction */}
        <div className="space-y-3">
          <h2 className="font-medium">Send Again</h2>
        </div>

        {/* pocket */}
        <div className="space-y-3">
          <h2 className="font-medium">Pocket</h2>
        </div>
      </div>
    </div>
  );
}

function HistoryTransaction({
  amount,
  type,
  status,
}: Partial<IpaymentHistory>) {
  return (
    <div className="flex space-x-5 bg-white rounded">
      <p>{status}</p>
      {type === "receiver" ? (
        <p className="text-green-500">{amount}</p>
      ) : (
        <p className="text-gray-500">{amount}</p>
      )}
    </div>
  );
}
