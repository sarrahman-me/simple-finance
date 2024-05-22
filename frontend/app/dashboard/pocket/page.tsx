import { CardPocket } from "@/components/atoms";
import { AppBar } from "@/components/molecules";
import { PocketNotFound } from "@/components/template";
import { IPaymentAccount } from "@/interface/payment_account";
import { GetDataApi } from "@/utils/fetcher";

export default async function Page() {
  const { data }: IPaymentAccount = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/api/payment-account`
  );

  return (
    <div className="space-y-5">
      <AppBar title="Pocket" />
      <div>
        {data.length > 0 ? (
          data.map((pocket, i) => (
            <div
              key={i}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            >
              <CardPocket
                title={pocket.name}
                amount={Number(pocket.balance)}
                account_number={pocket.account_number}
              />
            </div>
          ))
        ) : (
          <PocketNotFound />
        )}
      </div>
    </div>
  );
}
