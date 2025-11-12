import { NavLink } from "react-router-dom";
import { type SideItemTypes } from "@/types/types";

const SideItem: React.FC<SideItemTypes> = ({ Icon, href, title }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `p-3 flex gap-6 items-center justify-start ${
          isActive ? "text-[#FCFCFC]" : "text-[#AFAFAF]"
        }`
      }
    >
      <Icon className="w-5 h-5 " />
      <p className="text-sm lg:text-base font-medium text-nowrap">{title}</p>
    </NavLink>
  );
};

export default SideItem;
