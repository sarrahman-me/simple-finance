"use client";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";
import { CiLogout } from "react-icons/ci";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        Confirm.show(
          "Confirmation",
          "are you sure you want to leave?",
          "Logout",
          "No",
          async () => {
            await fetch("/api/auth/logout", {
              method: "POST",
            });

            router.refresh();
          },
          () => {},
          {
            titleColor: "#0284c7",
            okButtonBackground: "#0284c7",
            borderRadius: "6px",
          }
        );
      }}
      className={`flex items-center space-x-3 p-2 rounded-md text-gray-500 cursor-pointer select-none hover:bg-white`}
    >
      <span className={`text-lg text-red-600`}>{<CiLogout />}</span>
      <p className="">Logout</p>
    </div>
  );
}
