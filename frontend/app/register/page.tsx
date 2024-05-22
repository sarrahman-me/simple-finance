"use client";
import { Button, Textfield } from "@/components/atoms";
import auth_image from "@/public/svgs/auth.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, ReactElement, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.statusCode < 400) {
      router.push("/login");
      return;
    }

    alert(data.message);
  };

  return (
    <Template>
      <div className="space-y-8">
        <h2 className="text-lg text-primary-600 font-bold">Register :</h2>
        <form onSubmit={handleRegister} className="space-y-3">
          <Textfield
            label="Name"
            placeholder="e.g Jhon Doe"
            onChange={(v) => setPayload({ ...payload, name: v })}
          />
          <Textfield
            type="email"
            label="Email"
            placeholder="example@email.com"
            onChange={(v) => setPayload({ ...payload, email: v })}
          />
          <Textfield
            type="password"
            label="Password"
            placeholder="* * * * * *"
            onChange={(v) => setPayload({ ...payload, password: v })}
          />
          <Button
            disabled={!payload.email || !payload.name || !payload.password}
            fullWidth
            type="submit"
          >
            Register
          </Button>
        </form>
        <p className="text-sm text-gray-500 text-center">
          already have an account.{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary-600 cursor-pointer"
          >
            login
          </span>
        </p>
      </div>
    </Template>
  );
}

function Template({ children }: { children: ReactElement }) {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-400 to-primary-600 h-screen flex items-center p-1">
      <div className="mx-auto max-w-3xl bg-white rounded w-full grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
        <div>{children}</div>
        <div className="hidden md:flex justify-center items-center">
          <Image src={auth_image} alt="Animation Auth" />
        </div>
      </div>
    </div>
  );
}
