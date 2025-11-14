import { MdOutlineDashboard } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { LuSquareUserRound } from "react-icons/lu";

import type { SideItemTypes } from "@/types/types";
import { FaNfcSymbol } from "react-icons/fa6";

export const sideMenue: SideItemTypes[] = [
  {
    href: "/dashboard",
    title: "Dashboard",
    Icon: MdOutlineDashboard,
  },
  {
    href: "/distributors",
    title: "Distributors",
    Icon: LuUsersRound,
  },
  {
    href: "/clients",
    title: "Clients",
    Icon: LuSquareUserRound,
  },
  {
    href: "/symbols",
    title: "Symbols",
    Icon: FaNfcSymbol,
  },
];
