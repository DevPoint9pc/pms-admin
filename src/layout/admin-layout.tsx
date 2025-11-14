import SideMenue from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="relative w-dvw h-dvh flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
      {/* ----------- Left (Sidebar) ---------- */}
      <div className="relative z-10 w-min bg-[#191919]">
        <SideMenue />
      </div>

      {/* ----------- Right (Main Content) ---------- */}
      <div className="relative z-10 flex-1 flex flex-col h-full gap-4 lg:gap-6 p-3 lg:p-10 lg:overflow-y-auto bg-[#0D0907] text-white">
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
