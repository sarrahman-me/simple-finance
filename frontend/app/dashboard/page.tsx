import { AppBar } from "@/components/molecules";
import { GetDataApi } from "@/utils/fetcher";
import { formatCurrency } from "@/utils/formatCurrency";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

export default async function Page() {
  const { totalBalance }: { totalBalance: number } = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/api/dashboard`
  );

  return (
    <div className="space-y-8">
      <AppBar title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* total transaction */}
        <div className="p-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg shadow-lg space-y-3">
          <div className="flex items-center space-x-3">
            <MdOutlineAccountBalanceWallet size={40} />
            <h2 className="text-lg font-semibold">Total Balance</h2>
          </div>
          <h3 className="text-4xl font-bold">{formatCurrency(totalBalance)}</h3>
        </div>

        {/* total transaction */}
        <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg shadow-lg space-y-3">
          <div className="flex items-center space-x-3">
            <MdOutlineAccountBalanceWallet size={40} />
            <h2 className="text-lg font-semibold">Total Transaction</h2>
          </div>
          <h3 className="text-4xl font-bold">{0}</h3>
        </div>
        <div></div>
      </div>
    </div>
  );
}
