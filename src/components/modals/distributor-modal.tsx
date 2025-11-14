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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/store/use-app-store";
import toast from "react-hot-toast";

const distributorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
  aadhar: z.string().regex(/^\d{12}$/, "Aadhar must be exactly 12 digits"),
  pan: z
    .string()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Invalid PAN format (e.g., ABCDE1234F)"
    ),
});

type DistributorFormData = z.infer<typeof distributorSchema>;

export default function AddDistributorModal() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { addDistributor } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DistributorFormData>({
    resolver: zodResolver(distributorSchema),
  });

  const onSubmit = async (data: DistributorFormData) => {
    try {
      await addDistributor({
        name: data.name,
        email: data.email,
        password: data.password,
        aadhar: data.aadhar,
        pan: data.pan,
      });

      toast.success("Distributor added");
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to add distributor:", error);
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
                id="aadhar"
                placeholder="123456789012"
                {...register("aadhar")}
                className={errors.aadhar ? "border-red-500" : ""}
                maxLength={12}
              />
              {errors.aadhar && (
                <p className="text-xs text-red-500">{errors.aadhar.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input
                id="pan"
                placeholder="ABCDE1234F"
                {...register("pan")}
                className={`uppercase ${errors.pan ? "border-red-500" : ""}`}
                style={{ textTransform: "uppercase" }}
                maxLength={10}
              />
              {errors.pan && (
                <p className="text-xs text-red-500">{errors.pan.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Distributor"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
