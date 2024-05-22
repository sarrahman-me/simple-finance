import React from "react";
import { BottomBar, Sidebar } from "@/components/molecules";
import { Metadata } from "next";
import Authorization from "../authorization";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <Authorization>
      <main className="bg-white min-h-screen md:p-2 text-sm lg:text-base">
        {/* sidebar */}
        <div className="p-2 pt-5 lg:p-5 fixed overflow-y-auto h-screen left-0 bottom-0 md:w-14 lg:w-72 min-h-screen hidden md:block">
          <Sidebar />
        </div>

        {/* main dashboard */}
        <main className="p-2 lg:p-5 md:rounded-md md:border bg-secondary min-h-screen ml-0 md:ml-14 lg:ml-72">
          {children}
          <p className="text-secondary-medium text-xs text-center mt-10">
            Created By{" "}
            <a
              href="https://www.linkedin.com/in/sarrahman-me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="underline cursor-pointer text-primary-600">
                Sarrahman
              </span>
            </a>
          </p>
        </main>

        {/* bottom menu (mobile) */}
        <div className="p-2 bg-secondary sticky w-full bottom-0 block md:hidden">
          <BottomBar />
        </div>
      </main>
    </Authorization>
  );
}
