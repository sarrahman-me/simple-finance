import { CardPocket } from "@/components/atoms";
import { GetDataApi } from "@/utils/fetcher";

export default async function Page() {
  const data = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/api/payment-account`
  );

  return (
    <div className="space-y-5">
      <p className="text-lg font-bold">Pocket</p>
      <div className="grid grid-cols-2 gap-2">
        <CardPocket title="Pocket 1" amount={40000} />
        <CardPocket title="Pocket 2" amount={3000} />
      </div>
    </div>
  );
}
