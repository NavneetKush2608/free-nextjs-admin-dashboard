import AirQualityDashboard from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "AirWatch - Air Pollution Monitoring Dashboard",
  description: "Real-time air quality monitoring and analysis dashboard",
};

const Home: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <AirQualityDashboard />
      </DefaultLayout>
    </>
  );
};

Home.displayName = 'Home';

export default Home;
