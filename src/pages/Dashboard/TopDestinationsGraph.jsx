import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
// import ProgressBar from "./ProgressBar.jsx";
import { useProductContext } from "../../context/ProductContext";
import "./graph.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const TopDestinationsGraph = () => {
  const { orders, loading, error } = useProductContext(); // Fetching orders from context
  const [dataValues, setDataValues] = useState([0, 0, 0, 0, 0, 0]); // One more value for "Others"
  const isMobile = window.innerWidth < 576;
  // Styles for container

  const labels = [
    "Uttar Pradesh",
    "Maharashtra",
    "Karnataka",
    "Haryana",
    "Delhi",
    "Others", // Added "Others" for unmatched states
  ];

  const colors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#f44336",
    "#9c27b0",
    "#607d8b",
  ];

  useEffect(() => {
    if (!loading && orders?.success && Array.isArray(orders.orders)) {
      //console.log("Valid orders data found");

      const orderCountByState = Array(labels.length).fill(0);

      orders.orders.forEach((order) => {
        // Accessing the correct 'state' property from the order
        const normalizedState = order.state?.toLowerCase().trim() || "";
        const stateIndex = labels.findIndex(
          (state) => state.toLowerCase().trim() === normalizedState
        );

        if (stateIndex !== -1 && stateIndex < labels.length - 1) {
          // Incrementing predefined states count
          orderCountByState[stateIndex]++;
        } else {
          // Incrementing "Others" category count
          orderCountByState[labels.length - 1]++;
        }
      });

      //console.log("Order counts by state:", orderCountByState);

      // Only update state if the new counts differ from the old
      if (JSON.stringify(orderCountByState) !== JSON.stringify(dataValues)) {
        setDataValues(orderCountByState);
      }
    } else {
      //console.log("Loading or invalid orders data");
    }
  }, [orders, loading]);

  const total =
    orders && orders.success && Array.isArray(orders.orders)
      ? orders.orders.length
      : 0;

  const stateData = labels.map((label, index) => ({
    state: label,
    percentage: total > 0 ? ((dataValues[index] / total) * 100).toFixed(2) : 0,
    color: colors[index],
  }));

  //console.log("State data with percentages:", stateData);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Orders",
        data: dataValues,
        backgroundColor: colors.map((color) => `${color}66`),
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: total + total / 10 + 1, // Setting x-axis max value to the total number of orders
        title: {
          display: true,
          text: `Total Orders: ${total}`, // Displaying total orders on the x-axis
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#000",
        },
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
          return `${percentage}%`; // Display percentage
        },
        color: "#000",
        anchor: (context) => {
          const value = context.raw;
          const percentage = total > 0 ? (value / total) * 100 : 0;
          return percentage >= 90 ? "start" : "end"; // Position above for high values
        },
        align: (context) => {
          const value = context.raw;
          const percentage = total > 0 ? (value / total) * 100 : 0;
          return percentage > 90 ? "top" : "end"; // Adjust alignment for high values
        },
        offset: 4, // Adds space between the label and the bar
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${context.label}: ${value} (${percentage}%)`; // Show value and percentage in tooltip
          },
        },
      },
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        barThickness: 25, // Adjust this value to increase/decrease the bar thickness
        maxBarThickness: 30, // Maximum thickness for bars
      },
    },
  };

  return (
    <div className="graph-container">
      <span>Top Destinations</span>
      {/* <ProgressBar data={stateData} /> */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopDestinationsGraph;
