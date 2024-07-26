"use client";
import { Button, Textfield } from "@/components/atoms";
import { AppBar } from "@/components/molecules";
import { useRouter } from "next/navigation";
import { Loading, Notify } from "notiflix";
import { FormEvent, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    name: "",
  });

  const handleCreatingPocket = async (e: FormEvent) => {
    e.preventDefault();
    Loading.standard({
      svgColor: "#0284c7",
    });

    const res = await fetch("/api/payment-account", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.statusCode < 400) {
      Notify.success(data.message);
      router.back();
      Loading.remove();
      return;
    }

    Loading.remove();
    Notify.failure(data.message);
  };

  return (
    <div className="space-y-5">
      <AppBar arrowBack title="New Pocket" />
      <form
        onSubmit={handleCreatingPocket}
        className="space-y-3 md:w-1/2 w-full"
      >
        <Textfield
          onChange={(v) => setPayload({ ...payload, name: v })}
          placeholder="monthly bill"
        />
        <Button type="submit" disabled={!payload.name} fullWidth>
          Create
        </Button>
      </form>
    </div>
  );
}
