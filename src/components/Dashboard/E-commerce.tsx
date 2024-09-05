"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import HealthRecommendationCard from "../HealthRecommendationCard";
import AQICard from "../AQICard";
import CircularProgressBar from "../CircularProgressBar";
import { ApexOptions } from "apexcharts";
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), { ssr: false });
const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), { ssr: false });
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useLocation } from '../../components/contexts/LocationContext';

interface PollutionDistributionCardProps {
  pm25: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

const PollutionDistributionCard: React.FC<PollutionDistributionCardProps> = ({ pm25, o3, no2, so2, co }) => {
  const series = [{
    data: [pm25, o3, no2, so2, co]
  }];
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['PM2.5', 'O3', 'NO2', 'SO2', 'CO'],
    },
    colors: ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f97316'],
    title: {
      text: 'Pollution Distribution',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " µg/m³";
        }
      }
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Pollution Distribution
        </h4>
      </div>
      <div className="mb-2">
        <div id="pollutionDistribution" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={380}
          />
        </div>
      </div>
    </div>
  );
};

const AirQualityDashboard: React.FC = () => {
  const { lat, lng } = useLocation();
  const [aqi, setAqi] = useState<number | null>(null);
  const [pm25, setPm25] = useState<number>(0);
  const [pm10, setPm10] = useState<number>(0);
  const [o3, setO3] = useState<number>(0);
  const [no2, setNo2] = useState<number>(0);
  const [so2, setSo2] = useState<number>(0);
  const [co, setCo] = useState<number>(0);

  const fetchAirQualityData = useCallback(async () => {
    if (lat === null || lng === null) {
      setAqi(null);
      return;
    }

    try {
      const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=57b74b070c5f096f0f45fc49954843db05043616`);
      const data = await response.json();
      if (data.status === "ok") {
        setAqi(data.data.aqi);
        setPm25(data.data.iaqi.pm25?.v || 0);
        setPm10(data.data.iaqi.pm10?.v || 0);
        setO3(data.data.iaqi.o3?.v || 0);
        setNo2(data.data.iaqi.no2?.v || 0);
        setSo2(data.data.iaqi.so2?.v || 0);
        setCo(data.data.iaqi.co?.v || 0);
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    }
  }, [lat, lng]);

  useEffect(() => {
    fetchAirQualityData();
  }, [fetchAirQualityData]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5">
        <AQICard
          value={aqi !== null ? aqi : "N/A"}
          text="Air Quality Index"
          subText={aqi !== null ? (aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : "Unhealthy") : "No location selected"}
          color={aqi !== null ? (aqi <= 50 ? "#4ade80" : aqi <= 100 ? "#facc15" : "#f87171") : "#9ca3af"}
        />
        <div className="md:col-span-1 bg-white dark:bg-boxdark rounded-sm border border-stroke shadow-default p-4">
          <h2 className="text-xl font-bold mb-4">Other Pollutants</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <CircularProgressBar value={pm25} maxValue={500} size={100} strokeWidth={10} text="PM2.5" subText="µg/m³" color="#3b82f6" textSize="small" />
            <CircularProgressBar value={pm10} maxValue={500} size={100} strokeWidth={10} text="PM10" subText="µg/m³" color="#10b981" textSize="small" />
            <CircularProgressBar value={o3} maxValue={500} size={100} strokeWidth={10} text="O3" subText="ppb" color="#ef4444" textSize="small" />
            <CircularProgressBar value={no2} maxValue={500} size={100} strokeWidth={10} text="NO2" subText="ppb" color="#8b5cf6" textSize="small" />
            <CircularProgressBar value={so2} maxValue={500} size={100} strokeWidth={10} text="SO2" subText="ppb" color="#f97316" textSize="small" />
            <CircularProgressBar value={co} maxValue={500} size={100} strokeWidth={10} text="CO" subText="ppm" color="#6b7280" textSize="small" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <PollutionDistributionCard pm25={pm25} o3={o3} no2={no2} so2={so2} co={co} />
        <HealthRecommendationCard aqi={aqi !== null ? aqi : 0} />
        <MapOne lat={lat} lng={lng} />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default AirQualityDashboard;