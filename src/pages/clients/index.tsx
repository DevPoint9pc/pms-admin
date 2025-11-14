// src/pages/ClientsPage.tsx
import SectionHeader from "@/components/section-header";
import ClientOnboardingModal from "@/components/modals/client-modal";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import type { Client } from "@/types/types";
import { useAppStore } from "@/store/use-app-store";

const ClientsPage = () => {
  const { clients } = useAppStore();

  const clientArray: Client[] = Object.keys(clients)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => clients[key as any]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }: any) => row.getValue("name"),
      },
      {
        accessorKey: "accountNumber",
        header: "Account Number",
        cell: ({ row }: any) => row.getValue("accountNumber"),
      },
      {
        accessorKey: "investmentAmount",
        header: "Investment Amount",
        cell: ({ row }: any) =>
          `$${
            (
              row.getValue("investmentAmount") as number | undefined
            )?.toLocaleString() || "—"
          }`,
      },
      {
        accessorKey: "distributor",
        header: "Distributor",
        cell: ({ row }: any) =>
          typeof row.original.distributor === "object"
            ? row.original.distributor.name
            : row.original.distributor || "Unknown Distributor",
      },
      {
        accessorKey: "currentBalance",
        header: "Balance",
        cell: ({ row }: any) => row.getValue("currentBalance"),
      },
    ],
    []
  );
  console.log(clients);
  return (
    <section className="w-full h-max flex py-10 lg:py-0 flex-col gap-8">
      <SectionHeader
        title="Clients"
        subtitle="Onboard and manage all your clients"
        extraComps={<ClientOnboardingModal />}
      />

      <DataTable
        data={clientArray}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search clients..."
        itemsPerPage={5}
        showPagination
      />
    </section>
  );
};

export default ClientsPage;
