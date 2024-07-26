import Image from "next/image";
import auth_image from "@/public/svgs/auth.svg";
import { ReactElement } from "react";

export default function TemplateAuth({ children }: { children: ReactElement }) {
  return (
    <div className="bg-gradient-to-br from-primary-300 via-primary-50 to-primary-200 h-screen flex items-center p-1">
      <div className="mx-auto max-w-3xl bg-white rounded w-full grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
        <div>{children}</div>
        <div className="hidden md:flex justify-center items-center">
          <Image src={auth_image} alt="Animation Auth" />
        </div>
      </div>
    </div>
  );
}
