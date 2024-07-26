import { ReactElement } from "react";
import { CgProfile } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";

export const dashboard_menu_bottom_mobile: {
  title: string;
  icon: ReactElement;
  href: string;
}[] = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    href: "/dashboard",
  },
  {
    title: "Pocket",
    icon: <BsCreditCard2Front />,
    href: "/dashboard/pocket",
  },
  {
    title: "Transaction",
    icon: <GrTransaction />,
    href: "/dashboard/transaction",
  },
  {
    title: "Profile",
    icon: <CgProfile />,
    href: "/dashboard/profile",
  },
];
