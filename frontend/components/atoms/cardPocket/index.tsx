"use client";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";
import CopyText from "../copyText";

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
      className="bg-white border rounded hover:shadow-none cursor-pointer p-2 py-3 space-y-2 shadow-sm"
    >
      <p className="text-base font-medium">{title}</p>
      <p className="font-medium text-lg">{formatCurrency(amount)}</p>
    </div>
  );
};

export default CardPocket;
