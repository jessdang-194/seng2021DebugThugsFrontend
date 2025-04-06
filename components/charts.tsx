"use client"

import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Line Chart Component
export function LineChart() {
  const data: ChartData<"line"> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Submissions",
        data: [3, 2, 5, 1, 4, 3],
        borderColor: "#AD7CF2",
        backgroundColor: "rgba(173, 124, 242, 0.5)",
        tension: 0.3,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  return <Line data={data} options={options} />
}

// Bar Chart Component
export function BarChart() {
  const data: ChartData<"bar"> = {
    labels: ["Legal", "Financial", "Technical", "Marketing", "Other"],
    datasets: [
      {
        label: "Number of Submissions",
        data: [2, 4, 3, 1, 2],
        backgroundColor: [
          "rgba(173, 124, 242, 0.7)",
          "rgba(180, 163, 230, 0.7)",
          "rgba(200, 90, 237, 0.7)",
          "rgba(248, 136, 90, 0.7)",
          "rgba(249, 136, 88, 0.7)",
        ],
        borderColor: ["#AD7CF2", "#B4A3E6", "#C85AED", "#F8885A", "#F98858"],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

// Pie Chart Component
export function PieChart() {
  const data: ChartData<"pie"> = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [8, 3, 1],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 206, 86, 0.7)", "rgba(255, 99, 132, 0.7)"],
        borderColor: ["rgb(75, 192, 192)", "rgb(255, 206, 86)", "rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  return <Pie data={data} options={options} />
}

