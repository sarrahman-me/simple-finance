"use client";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";

const CardPocket = ({
  title,
  amount,
  account_number,
}: {
  title: string;
  amount: number;
  account_number: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/dashboard/pocket/${account_number}`)}
      className="bg-white border rounded hover:shadow cursor-pointer p-2 py-3 space-y-2"
    >
      <p className="text-base font-medium">{title}</p>
      <p>{formatCurrency(amount)}</p>
    </div>
  );
};

export default CardPocket;
