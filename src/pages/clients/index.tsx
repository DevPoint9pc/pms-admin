// src/pages/ClientsPage.tsx
import SectionHeader from "@/components/section-header";
import ClientOnboardingModal from "@/components/modals/client-modal";
import { useClientStore } from "@/store/use-client-store";
import { useEffect, useMemo } from "react";
import { DataTable } from "@/components/data-table";
import type { Client } from "@/types/types";

const ClientsPage = () => {
  const { fetchClients, clients } = useClientStore();

  useEffect(() => {
    fetchClients();
  }, []);

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
          `$${(row.getValue("investmentAmount") as number).toLocaleString()}`,
      },
      {
        accessorKey: "distributor",
        header: "Distributor",
        cell: ({ row }: any) => row.getValue("distributor"),
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

      {/* Assign Dialog */}
      {/* <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Client to Distributor</DialogTitle>
            <DialogDescription>
              Choose a distributor for this client
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={handleAssign}>
            <SelectTrigger>
              <SelectValue placeholder="Select distributor" />
            </SelectTrigger>
            <SelectContent>
              {distributors.length === 0 ? (
                <p className="p-2 text-sm ">No distributors available</p>
              ) : (
                distributors.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name} ({d.clientsCount} clients)
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog> */}
      <DataTable
        data={clientArray}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search clients"
        itemsPerPage={5}
        heading="Client List"
        showPagination
      />
    </section>
  );
};

export default ClientsPage;
