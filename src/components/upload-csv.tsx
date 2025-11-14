import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardWrapper from "./card-wrapper";
import { useAppStore } from "@/store/use-app-store";
import { toast } from "react-hot-toast";
import { FileText } from "lucide-react";

const UploadCsv = () => {
  const uploadCsv = useAppStore((state) => state.uploadCsv);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text !== "string") return;

      const rows = text
        .split("\n")
        .map((line) => line.split(",").map((c) => c.trim()))
        .filter((r) => r.length > 1 && r.some((c) => c));

      console.log("CSV Preview (first 10 rows):");
      console.table(rows.slice(0, 10));
      console.log(`Full CSV rows: ${rows.length}`);
    };
    reader.readAsText(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }

    setLoading(true);
    try {
      await uploadCsv(file); // just pass the File object
      console.log("CSV uploaded successfully");
    } catch (err) {
      console.error("CSV upload failed", err);
    } finally {
      setLoading(false);
      setFile(null);
      const input = document.getElementById(
        "csv-upload"
      ) as HTMLInputElement | null;
      if (input) input.value = "";
    }
  };

  return (
    <CardWrapper className="w-full">
      <div
        className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-6
                   flex flex-col items-center justify-center gap-3 cursor-pointer
                   hover:border-primary/60 transition-all bg-card/30 min-h-[300px]"
        onClick={() => document.getElementById("csv-upload")?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFile = e.dataTransfer.files?.[0];
          if (droppedFile) {
            setFile(droppedFile);
          }
        }}
      >
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />

        <FileText className="w-10 h-10 text-muted-foreground" />

        {file ? (
          <p className="text-sm text-primary font-medium">{file.name}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Drag & drop your CSV here, or click to browse
          </p>
        )}
      </div>

      <Button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full mt-4"
      >
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Uploading...
          </>
        ) : (
          "Upload CSV"
        )}
      </Button>
    </CardWrapper>
  );
};

export default UploadCsv;
