// DistributorsPage.tsx
import SectionHeader from "@/components/section-header";
import { useDistributorStore } from "@/store/use-distributor-store";
import AddDistributorModal from "@/components/modals/distributor-modal";
import { formatDate } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { DataTable } from "@/components/data-table";

const DistributorsPage = () => {
  const { distributors, fetchDistributors }: any = useDistributorStore();

  useEffect(() => {
    fetchDistributors();
  }, []);

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

      {
        accessorKey: "createdAt",
        header: "Joined",
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
        itemsPerPage={10}
        showPagination={true}
        noDataMessage="No distributors found. Add one using the button above."
      />
    </section>
  );
};

export default DistributorsPage;
