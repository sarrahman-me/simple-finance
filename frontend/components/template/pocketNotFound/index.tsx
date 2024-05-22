"use client";
import Image from "next/image";
import pocket from "@/public/svgs/pocket.svg";
import { Button, Textfield } from "@/components/atoms";
import { FormEvent, useState } from "react";
import { Loading, Notify } from "notiflix";
import { useRouter } from "next/navigation";

export default function PocketNotFound() {
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
      router.refresh();
      Loading.remove();
      return;
    }

    Loading.remove();
    Notify.failure(data.message);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col justify-center items-center order-2 md:order-1">
        <div className="space-y-3 text-left mx-auto max-w-md">
          <h3 className="text-lg text-center md:text-left md:text-2xl font-bold text-primary-950">
            You haven&apos;t made a pocket yet
          </h3>
          <p>Create your first pocket easily</p>
          <form onSubmit={handleCreatingPocket} className="space-y-3">
            <Textfield
              onChange={(v) => setPayload({ ...payload, name: v })}
              placeholder="shopping pocket"
            />
            <Button type="submit" disabled={!payload.name} fullWidth>
              Create
            </Button>
          </form>
        </div>
      </div>
      <div className="order-1 md:order-2 flex justify-center bg-gradient-to-tr from-secondary via-primary-50 to-secondary">
        <Image src={pocket.src} alt="Check" width={400} height={400} />
      </div>
    </div>
  );
}
