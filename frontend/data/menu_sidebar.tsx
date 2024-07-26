import { ReactElement } from "react";
import { GrTransaction } from "react-icons/gr";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";

interface menuInterface {
  title: string;
  icon: ReactElement;
  type: "dropdown" | "list";
  href?: string;
}

export const dashboard_menu_dekstop: menuInterface[] = [
  {
    type: "list",
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    href: "/dashboard",
  },
  {
    type: "list",
    title: "Pocket",
    icon: <BsCreditCard2Front />,
    href: "/dashboard/pocket",
  },
  {
    type: "list",
    title: "Transaction",
    icon: <GrTransaction />,
    href: "/dashboard/transaction",
  },
];
