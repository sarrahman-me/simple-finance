"use client";
import { useState } from "react";
import Textfield from "../textfield";
import Button from "../button";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { getCookie } from "cookies-next";
import { Notify } from "notiflix";

const token = getCookie("token") || "";

export default function InputPaymentAccount({
  setAccountNumber,
  accountNumber,
}: {
  setAccountNumber: (v: string) => void;
  accountNumber: string;
}) {
  const [data, setData] = useState<{
    account_number: string;
    name: string;
    pic: string;
    balance: string;
  }>();

  const handleCheck = async () => {
    // Validasi input
    if (!accountNumber) {
      Notify.warning("Account number cannot be empty");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_SERVER}/user/payment-account/check/${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch account data");
      }

      const paymentAccountRes = await res.json();
      setData(paymentAccountRes.data);
    } catch (err: any) {
      Notify.failure(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-2">
        <Textfield
          label="Destination Account"
          onChange={(v) => setAccountNumber(v)}
          placeholder="the destination pocket"
        />
        <Button onClick={handleCheck} icon={<MdOutlineContentPasteSearch />} />
      </div>
      {data?.account_number ? (
        <div className="space-y-3 bg-white rounded p-2 shadow-sm">
          <p>PIC: {data?.pic}</p>
          <p>Name: {data?.name}</p>
          <p>Account Number: {data?.account_number}</p>
        </div>
      ) : null}
    </div>
  );
}
