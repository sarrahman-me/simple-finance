"use client";
import { NavList } from "@/components/atoms";
import { dashboard_menu_dekstop } from "@/data/menu_sidebar";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="space-y-8">
      <h2 className="font-bold text-lg text-primary-600 hidden lg:block">
        Simple Finance
      </h2>

      <div className="space-y-5">
        {dashboard_menu_dekstop.map((item, i) => (
          <NavList
            key={i}
            title={item.title}
            icon={item.icon}
            href={item.href || ""}
          />
        ))}
      </div>

      <div className="absolute bottom-5">
        <div
          onClick={async () => {
            await fetch("/api/auth/logout", {
              method: "POST",
            });

            router.refresh();
          }}
          className={`flex items-center space-x-3 p-2 rounded-md text-gray-500 cursor-pointer select-none hover:bg-gray-50`}
        >
          <span className={`text-lg text-primary-600`}>{<CiLogout />}</span>
          <p className="lg:block hidden">Logout</p>
        </div>
      </div>
    </aside>
  );
}
