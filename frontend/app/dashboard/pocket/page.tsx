import { AddPocketCard, CardPocket } from "@/components/atoms";
import { AppBar } from "@/components/molecules";
import { PocketNotFound } from "@/components/template";
import { IPaymentAccount } from "@/interface/payment_account";
import { GetDataApi } from "@/utils/fetcher";
import { IoMdAddCircleOutline } from "react-icons/io";

export default async function Page() {
  const { data }: IPaymentAccount = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/api/payment-account`
  );

  return (
    <div className="space-y-5">
      <AppBar title="Pocket" />
      <div>
        {data.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {data.map((pocket, i) => (
                <CardPocket
                  key={i}
                  title={pocket.name}
                  amount={Number(pocket.balance)}
                  account_number={pocket.account_number}
                />
              ))}
              <AddPocketCard />
            </div>
          </div>
        ) : (
          <PocketNotFound />
        )}
      </div>
    </div>
  );
}
