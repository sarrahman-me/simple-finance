"use client";
import { isActivePage } from "@/utils/isActivePage";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";

const IconList = ({
  icon,
  title,
  href,
  id_webstore,
}: {
  icon: ReactElement;
  title: string;
  href: string;
  id_webstore?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = isActivePage(href, pathname, id_webstore);

  return (
    <div
      onClick={() => router.push(href)}
      className={`flex flex-col justify-center items-center p-1 rounded-md ${
        isActive
          ? "border bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white"
          : "text-primary-600"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <p className={`text-xs text-center ${isActive ? "inline" : "hidden"}`}>
        {title}
      </p>
    </div>
  );
};

export default IconList;
