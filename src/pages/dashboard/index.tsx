import CardWrapper from "@/components/card-wrapper";
import SectionHeader from "@/components/section-header";
import type { Client } from "@/types/types";
import { useAppStore } from "@/store/use-app-store";
import UploadCsv from "@/components/upload-csv";
import AddCashCard from "@/components/add-cash-card";

const DashboardPage = () => {
  const distributors = useAppStore((state) => state.distributors);
  const clients = useAppStore((state) => state.clients);

  const clientArray: Client[] = Array.isArray(clients)
    ? clients
    : (Object.values(clients) as Client[]);

  const totalInvestment = clientArray.reduce(
    (sum: number, client: Client) => sum + (client.investmentAmount || 0),
    0
  );

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
      title: "Total Investment",
      value: totalInvestment.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    },
  ];

  return (
    <section className="w-full h-max flex py-10 lg:py-0 flex-col gap-8">
      <SectionHeader
        title="Dashboard"
        subtitle="Overview of your admin panel metrics"
      />

      <div className=" grid grid-cols-3 gap-9">
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

      <div className="grid grid-cols-2 gap-9">
        <UploadCsv />
        <AddCashCard />
      </div>
    </section>
  );
};

export default DashboardPage;
