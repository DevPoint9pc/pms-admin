// src/components/modals/AddDistributorModal.tsx
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDistributorStore } from "@/store/use-distributor-store";

export default function AddDistributorModal() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { addDistributor } = useDistributorStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    aadhar: "",
    pan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return;
    }

    await addDistributor(formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      aadhar: "",
      pan: "",
    });
    setOpen(false);
  };

  const defaultTrigger = (
    <Button className="gap-2">
      <MdAdd size={20} />
      Add Distributor
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>

      <DialogContent className="max-w-md border-border/50">
        <DialogHeader>
          <DialogTitle>Create New Distributor</DialogTitle>
          <DialogDescription>
            Add a new distributor to your system
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
                id="aadhar"
                value={formData.aadhar}
                onChange={(e) =>
                  setFormData({ ...formData, aadhar: e.target.value })
                }
                placeholder="1234 5678 9012"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input
                id="pan"
                value={formData.pan}
                onChange={(e) =>
                  setFormData({ ...formData, pan: e.target.value })
                }
                placeholder="ABCDE1234F"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Distributor
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
