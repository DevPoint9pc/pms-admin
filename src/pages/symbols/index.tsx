import { DataTable } from "@/components/data-table";
import AddSymbolModal from "@/components/modals/symbol-modal";
import SectionHeader from "@/components/section-header";
import { useAppStore } from "@/store/use-app-store";
import { useMemo } from "react";

const SymbolsPage = () => {
  const { symbols }: any = useAppStore();

  const columns = useMemo(
    () => [
      {
        accessorKey: "symbol",
        header: "Symbol",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "instrumentId",
        header: "Instrument ID",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "isin",
        header: "ISIN",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "ltp",
        header: "LTP",
        cell: (info: any) => info.getValue(),
      },
    ],
    []
  );

  return (
    <section className="w-full h-max flex py-10 lg:py-0 flex-col gap-8">
      <SectionHeader
        title="Symbols"
        subtitle="View and manage all trading symbols"
        extraComps={<AddSymbolModal />}
      />

      <DataTable
        data={symbols}
        columns={columns}
        searchPlaceholder="Search symbols..."
        searchKey="symbol"
        itemsPerPage={10}
        showPagination={true}
        noDataMessage="No symbols found."
      />
    </section>
  );
};

export default SymbolsPage;
