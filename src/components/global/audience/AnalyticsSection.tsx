"use client"
import { motion } from "framer-motion"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

const barChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Engagement Rate",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "#3352CC",
    },
  ],
}

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Follower Growth",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "#3352CC",
      tension: 0.1,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#ffffff",
      },
    },
    title: {
      display: true,
      text: "Analytics Overview",
      color: "#ffffff",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "#ffffff",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "#ffffff",
      },
    },
  },
}

export default function AnalyticsSection() {
  return (
    <div className="mt-4 md:mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <motion.div
          className="h-[300px] md:h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Bar options={options} data={barChartData} />
        </motion.div>
        <motion.div
          className="h-[300px] md:h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Line options={options} data={lineChartData} />
        </motion.div>
      </div>
    </div>
  )
}

