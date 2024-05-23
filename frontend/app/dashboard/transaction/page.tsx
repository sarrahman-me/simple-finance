"use client";
import {
  Button,
  InputPaymentAccount,
  Select,
  Textarea,
  Textfield,
} from "@/components/atoms";
import { AppBar } from "@/components/molecules";
import { Loading, Notify } from "notiflix";
import { FormEvent, useState } from "react";

export default function Page() {
  const [payload, setPayload] = useState({
    from_address: "",
    to_address: "",
    amount: 0,
    description: "",
    currency: "usd",
  });

  const handleTransaction = async (e: FormEvent) => {
    e.preventDefault();
    Loading.standard({
      svgColor: "#0284c7",
    });

    const res = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        amount: Number(payload.amount),
      }),
    });

    const data = await res.json();

    if (data.statusCode < 400) {
      Notify.success(data.message);
      Loading.remove();
      return;
    }

    Loading.remove();
    Notify.failure(data.message);
  };

  return (
    <div className="space-y-5">
      <AppBar title="Transaction" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <form onSubmit={handleTransaction} className="space-y-5">
          <Select
            setValue={(v) => setPayload({ ...payload, from_address: v })}
            keyValue={{
              key: "account_number",
              value: "name",
            }}
            label="Source Pocket"
            urlDataApi={`${process.env.NEXT_PUBLIC_HOST_SERVER}/user/payment-account`}
            value={payload.from_address}
            placeholder="select source pocket..."
          />
          <InputPaymentAccount
            accountNumber={payload.to_address}
            setAccountNumber={(v) => setPayload({ ...payload, to_address: v })}
          />
          <Textfield
            type="number"
            label="Amount"
            placeholder="$ 0.00"
            onChange={(v) => setPayload({ ...payload, amount: v })}
          />
          <Textarea
            label="Description"
            placeholder="children's school fees"
            value={payload.description}
            onChange={(value) => setPayload({ ...payload, description: value })}
          />
          <Button
            type="submit"
            disabled={
              !payload.to_address || !payload.from_address || !payload.amount
            }
            fullWidth
          >
            Send
          </Button>
        </form>
        <div></div>
      </div>
    </div>
  );
}
