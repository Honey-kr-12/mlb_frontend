import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import {
  FaShoppingCart,
  FaHourglassHalf,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);
import './dashboard.css'
import TopDestinationsGraph from "./TopDestinationsGraph";
import Tile from './Tile';

const Dashboard = () => {
  // Sample order data
  const orderData = [
    { category: 'Electronics', count: 50 },
    { category: 'Fashion', count: 30 },
    { category: 'Home Appliances', count: 20 },
    { category: 'Books', count: 40 },
    { category: 'Toys', count: 10 },
  ];

  // Data for the Pie Chart
  const pieData = {
    labels: orderData.map((item) => item.category),
    datasets: [
      {
        label: 'Orders by Category',
        data: orderData.map((item) => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Data for the Bar Chart
  const barData = {
    labels: orderData.map((item) => item.category),
    datasets: [
      {
        label: 'Order Count',
        data: orderData.map((item) => item.count),
        backgroundColor: '#36A2EB',
        borderColor: '#1E90FF',
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar Chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Distribution by Category',
      },
    },
  };

  return (
    <div className="mainCharts">
            <div className='grid-tiles'>
      <Tile/>
      <Tile/>
      <Tile/>
      <Tile/>
      <Tile/>
      <Tile/>
      <Tile/>
        <div className="orderSummaryCard">
          <div className="orderSummary">
            <h3>7</h3>
            <p>Completed Orders</p>
            <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
              <strong>Today: </strong>
              9
            </p>
          </div>
          <div className="orderIcon">
            <FaCheckCircle size={40} color="#34A853" />
          </div>
        </div>
      </div>
    <div className="datagraph">
    <div className="dataCard topDestinationsCard">
        <TopDestinationsGraph />
      </div>
        <div className='dataCard pieChart'>
          <Pie data={pieData} />
        </div>
    </div>

      <div className='dataCard revenueCard' >
        <h3>Bar Chart</h3>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
