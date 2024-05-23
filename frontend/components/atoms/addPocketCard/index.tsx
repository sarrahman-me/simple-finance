"use client";
import { useRouter } from "next/navigation";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function AddPocketCard() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/dashboard/pocket/form")}
      className="bg-white border rounded hover:shadow-none cursor-pointer p-2 py-3 space-y-2 shadow-sm"
    >
      <div className="flex justify-center">
        <IoMdAddCircleOutline className="text-5xl bg-primary-50 rounded-full text-primary-600 p-1" />
      </div>
      <p className="text-center">Buat kantong baru</p>
    </div>
  );
}
