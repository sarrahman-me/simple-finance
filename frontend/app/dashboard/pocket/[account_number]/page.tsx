import { CopyText } from "@/components/atoms";
import { ActionsButton, AppBar } from "@/components/molecules";
import HistoryTransaction from "@/components/molecules/historyTransaction";
import { IPaymentAccountDetail } from "@/interface/payment_account_detail";
import { GetDataApi } from "@/utils/fetcher";
import { formatCurrency } from "@/utils/formatCurrency";

export default async function Page({
  params,
}: {
  params: { account_number: string };
}) {
  const { data }: IPaymentAccountDetail = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/api/payment-account/${params.account_number}`
  );

  return (
    <div className="space-y-5">
      <AppBar arrowBack title="Pocket" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="space-y-2 bg-white rounded p-2 shadow-sm">
            <CopyText textToCopy={data.account_number} />
            <p className="text-lg font-medium">{data.name}</p>
            <p className="text-lg font-medium">
              {formatCurrency(Number(data.balance))}
            </p>
          </div>
        </div>

        {/* actions */}
        <ActionsButton />
      </div>

      {/* Transaction history */}
      <HistoryTransaction account_number={params.account_number} />
    </div>
  );
}
