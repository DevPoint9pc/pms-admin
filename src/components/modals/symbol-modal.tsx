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
import { useAppStore } from "@/store/use-app-store";
import toast from "react-hot-toast";

const AddSymbolModal = () => {
  const [open, setOpen] = useState(false);
  const { addSymbol, fetchSymbols } = useAppStore();

  const [formData, setFormData] = useState({
    symbol: "",
    instrumentId: "",
    isin: "",
    name: "",
    ltp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.symbol ||
      !formData.instrumentId ||
      !formData.isin ||
      !formData.name ||
      !formData.ltp
    )
      return;

    const ltpValue = parseFloat(formData.ltp);
    if (isNaN(ltpValue) || ltpValue <= 0) return;

    try {
      await addSymbol({
        symbol: formData.symbol,
        instrumentId: formData.instrumentId,
        isin: formData.isin,
        name: formData.name,
        ltp: ltpValue,
      });
      toast.success("Symbol added successfully");

      await fetchSymbols();

      setFormData({
        symbol: "",
        instrumentId: "",
        isin: "",
        name: "",
        ltp: "",
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add symbol");
    }
  };

  const defaultTrigger = (
    <Button className="gap-2">
      <MdAdd size={20} />
      Add Symbol
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Symbol</DialogTitle>
          <DialogDescription>Add a new trading symbol</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              placeholder="GOOG"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  symbol: e.target.value.toUpperCase(),
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instrumentId">Instrument ID</Label>
            <Input
              id="instrumentId"
              placeholder="12345"
              value={formData.instrumentId}
              onChange={(e) =>
                setFormData({ ...formData, instrumentId: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isin">ISIN</Label>
            <Input
              id="isin"
              placeholder="US02079K3059"
              value={formData.isin}
              onChange={(e) =>
                setFormData({ ...formData, isin: e.target.value.toUpperCase() })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Alphabet Inc"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ltp">LTP</Label>
            <Input
              id="ltp"
              type="number"
              step="0.01"
              placeholder="1500.00"
              value={formData.ltp}
              onChange={(e) =>
                setFormData({ ...formData, ltp: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="flex w-full justify-center gap-2">
            <MdCheck size={20} />
            Add Symbol
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSymbolModal;
