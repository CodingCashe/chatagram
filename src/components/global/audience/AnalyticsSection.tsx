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
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Follower Growth",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
}

export default function AnalyticsSection() {
  return (
    <div className="mt-8 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Bar options={options} data={barChartData} />
        </motion.div>
        <motion.div
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

