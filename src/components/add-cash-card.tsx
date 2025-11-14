import { useState } from "react";
import CardWrapper from "./card-wrapper";
import { useAppStore } from "@/store/use-app-store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import type { ActionType, Cash } from "@/types/types";

const CashinCashOutCard = () => {
  const { clients, cashInCashOut } = useAppStore();
  const [formData, setFormData] = useState<Cash>({
    client: "",
    amount: "",
    remark: "",
    type: "CASH_IN",
  });

  const handleSubmit = async () => {
    if (!formData.client || !formData.amount) {
      toast.error("Please select client and enter amount");
      return;
    }

    try {
      await cashInCashOut({
        client: formData.client,
        amount: Number(formData.amount),
        type: formData.type,
        remark: formData.remark,
      });
      if (formData.type === "CASH_IN") {
        toast.success("Cash added successfully");
      } else {
        toast.success("Cash out successfully");
      }
      setFormData({ client: "", amount: "", remark: "", type: "CASH_IN" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CardWrapper>
      <h1 className="font-semibold text-lg">Cash Management</h1>

      <div className="space-y-4 mt-4">
        {/* Select Client */}
        <div className="space-y-2">
          <Label htmlFor="client">Choose Client</Label>
          <Select
            value={formData.client}
            onValueChange={(value) =>
              setFormData({ ...formData, client: value })
            }
          >
            <SelectTrigger className="w-full" id="client">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Action Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value as ActionType })
            }
          >
            <SelectTrigger className="w-full" id="type">
              <SelectValue placeholder="Select action type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CASH_IN">Cash In</SelectItem>
              <SelectItem value="CASH_OUT">Cash Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        {/* Remark */}
        <div className="space-y-2">
          <Label htmlFor="remark">Remark</Label>
          <Input
            id="remark"
            placeholder="Add a remark (optional)"
            value={formData.remark}
            onChange={(e) =>
              setFormData({ ...formData, remark: e.target.value })
            }
          />
        </div>

        <Button onClick={handleSubmit} className="mt-2 w-full">
          {formData.type === "CASH_IN" ? "Add Cash" : "Cash Out"}
        </Button>
      </div>
    </CardWrapper>
  );
};

export default CashinCashOutCard;
