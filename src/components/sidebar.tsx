import SideItem from "./sidebar-item";
import { sideMenue } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";

const SideMenue = () => {
  const { logout } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };
  return (
    <div className="px-6 py-10 hidden lg:block bg-[#0F0F0F] h-screen">
      <div className="mt-8 flex flex-col gap-2">
        {sideMenue.map((item) => (
          <SideItem key={item.title} {...item} />
        ))}

        <Button
          variant="destructive"
          className="mt-4 rounded-3xl"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideMenue;
