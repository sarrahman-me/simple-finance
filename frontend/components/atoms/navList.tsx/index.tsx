"use client";
import { isActivePage } from "@/utils/isActivePage";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";

interface navListProps {
  title: string;
  icon: ReactElement;
  href: string;
}

const NavList = ({ title, icon, href }: navListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = isActivePage(href, pathname);

  return (
    <div
      onClick={() => router.push(href)}
      className={`flex items-center space-x-3 p-2 rounded-md text-secondary-medium cursor-pointer select-none ${
        isActive
          ? "bg-gradient-to-tl from-primary-500 via-primary-600 to-primary-700 border text-white font-medium shadow-sm"
          : "hover:bg-primary-50"
      }`}
    >
      <span
        className={`text-lg ${isActive ? "text-white" : "text-primary-600"}`}
      >
        {icon}
      </span>
      <p className="lg:block hidden">{title}</p>
    </div>
  );
};

export default NavList;
