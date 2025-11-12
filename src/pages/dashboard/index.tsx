import CardWrapper from "@/components/card-wrapper";
import SectionHeader from "@/components/section-header";
import { useDistributorStore } from "@/store/use-distributor-store";
import { useClientStore } from "@/store/use-client-store";

const DashboardPage = () => {
  const distributors = useDistributorStore((state) => state.distributors);
  const clients = useClientStore((state) => state.clients);

  const totalInvestment = clients.reduce(
    (sum, client) => sum + client.investmentAmount,
    0
  );
  const assignedClients = clients.filter((c) => c.distributorId).length;
  const dashboardStats = [
    {
      title: "Total Distributors",
      value: distributors.length,
    },
    {
      title: "Total Clients",
      value: clients.length,
    },
    {
      title: "Assigned Clients",
      value: assignedClients,
    },
    {
      title: "Total Investment",
      value: `$${totalInvestment.toLocaleString()}`,
    },
  ];

  return (
    <section className="w-full h-max flex py-10 lg:py-0 flex-col gap-8">
      <SectionHeader
        title="Dashboard"
        subtitle="Overview of your admin panel metrics"
      />

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-9 lg:grid-cols-4">
        {dashboardStats?.map((item) => (
          <CardWrapper
            key={item.title}
            className="min-h-36 flex flex-col justify-between"
          >
            <h1 className="text-lg font-medium">{item.title}</h1>
            <p className="font-bold">{item.value}</p>
          </CardWrapper>
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;
