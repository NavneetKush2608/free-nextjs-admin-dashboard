"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "line",
    height: 335,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ["#3C50E0", "#80CAEE", "#10B981", "#F59E0B", "#EF4444"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    show: true,
    borderColor: "#e0e0e0",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  xaxis: {
    categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 100,
    title: {
      text: "Concentration",
      style: {
        fontSize: "14px",
        fontWeight: 500,
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
      radius: 99,
    },
  },
};

const ChartTwo: React.FC = () => {
  const series = [
    {
      name: "PM2.5",
      data: [35, 41, 36, 26, 45],
    },
    {
      name: "O3",
      data: [52, 48, 55, 50, 53],
    },
    {
      name: "NO2",
      data: [20, 25, 22, 18, 24],
    },
    {
      name: "SO2",
      data: [10, 12, 15, 11, 13],
    },
    {
      name: "CO",
      data: [0.8, 1.0, 1.2, 0.9, 1.1],
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Pollutant Trends (Last 5 Days)
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
