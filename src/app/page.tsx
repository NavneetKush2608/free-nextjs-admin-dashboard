import { Metadata } from "next";
import Link from "next/link";
import GetStarted from "@/components/GetStarted/GetStarted";

export const metadata: Metadata = {
  title: "AirWatch - Get Started",
  description: "Welcome to AirWatch - Air Pollution Monitoring Dashboard",
};

const Home: React.FC = () => {
  return (
    <div>
      <GetStarted />
    </div>
  );
};

export default Home;
