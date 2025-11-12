import { LayoutDashboard, Users, UserSquare2 } from "lucide-react";
import type { SideItemTypes } from "@/types/types";

export const sideMenue: SideItemTypes[] = [
  {
    href: "/dashboard",
    title: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    href: "/distributors",
    title: "Distributors",
    Icon: Users,
  },
  {
    href: "/clients",
    title: "Clients",
    Icon: UserSquare2,
  },
];
