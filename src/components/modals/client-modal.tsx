// src/components/modals/ClientOnboardingModal.tsx
import { useState } from "react";
import { MdAdd, MdCheck } from "react-icons/md";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/store/use-app-store";
import toast from "react-hot-toast";

export default function ClientOnboardingModal({}) {
  const [open, setOpen] = useState(false);
  const { addClient, fetchClients, distributors } = useAppStore();

  const [formData, setFormData] = useState<any>({
    accountNumber: "",
    name: "",
    investmentAmount: "",
    distributor: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.investmentAmount);
    if (
      !formData.accountNumber ||
      !formData.name ||
      !formData.distributor ||
      isNaN(amount) ||
      amount <= 0
    )
      return;

    try {
      await addClient({
        accountNumber: formData.accountNumber,
        name: formData.name,
        investmentAmount: amount,
        distributor: formData.distributor,
      });

      console.log("Distributor", formData.distributor);
      toast.success("Client added");
      await fetchClients();

      setFormData({
        accountNumber: "",
        name: "",
        investmentAmount: "",
        distributor: "",
      });

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const defaultTrigger = (
    <Button className="gap-2">
      <MdAdd size={20} />
      Add Client
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Client Onboarding</DialogTitle>
          <DialogDescription>
            Add a new client with account number, investment, and distributor
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
              }
              placeholder="ACC12345"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
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
            <Label htmlFor="investment">Investment Amount ($)</Label>
            <Input
              id="investment"
              type="number"
              min="1"
              step="0.01"
              value={formData.investmentAmount}
              onChange={(e) =>
                setFormData({ ...formData, investmentAmount: e.target.value })
              }
              placeholder="500000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="distributor">Assign Distributor</Label>
            <Select
              value={formData.distributor}
              onValueChange={(value) =>
                setFormData({ ...formData, distributor: value })
              }
            >
              <SelectTrigger className="w-full" id="distributor">
                <SelectValue placeholder="Select distributor" />
              </SelectTrigger>
              <SelectContent>
                {distributors.map((d) => {
                  return (
                    <SelectItem key={d.id} value={d.id}>
                      {d.distributorName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-muted p-4 mt-4">
            <h4 className="mb-3 font-semibold">Summary</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Account:</span>{" "}
                {formData.accountNumber}
              </p>
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {formData.name}
              </p>
              <p>
                <span className="text-muted-foreground">Investment:</span> $
                {parseFloat(formData.investmentAmount || "0").toLocaleString()}
              </p>
              <p>
                <span className="text-muted-foreground">Distributor:</span>{" "}
                {distributors.find((d: any) => d.id === formData.distributor)
                  ?.distributorName || "—"}
              </p>
            </div>
          </div>

          <Button type="submit" className="flex w-full justify-center gap-2">
            <MdCheck size={20} />
            Add Client
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
