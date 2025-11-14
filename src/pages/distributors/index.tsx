// DistributorsPage.tsx
import SectionHeader from "@/components/section-header";
import AddDistributorModal from "@/components/modals/distributor-modal";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { useAppStore } from "@/store/use-app-store";

const DistributorsPage = () => {
  const { distributors }: any = useAppStore();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info: any) => info.getValue(),
      },
    ],
    []
  );

  return (
    <section className="w-full h-max flex py-10 lg:py-0 flex-col gap-8">
      <SectionHeader
        title="Distributors"
        subtitle="Manage all distributors in your system"
        extraComps={<AddDistributorModal />}
      />

      <DataTable
        data={distributors}
        columns={columns}
        searchPlaceholder="Search distributors..."
        searchKey="name"
        itemsPerPage={5}
        showPagination={true}
        noDataMessage="No distributors found. Add one using the button above."
      />
    </section>
  );
};

export default DistributorsPage;
