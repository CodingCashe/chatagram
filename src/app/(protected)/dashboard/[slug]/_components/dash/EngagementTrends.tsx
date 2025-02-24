import type React from "react"
import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface EngagementData {
  date: string
  dms: number
  comments: number
}

interface EngagementTrendsProps {
  data: EngagementData[]
}

const EngagementTrends: React.FC<EngagementTrendsProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const labels = data.map((d) => d.date)
    const dmsData = data.map((d) => d.dms)
    const commentsData = data.map((d) => d.comments)

    return {
      labels,
      datasets: [
        {
          label: "DMs",
          data: dmsData,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.5)",
        },
        {
          label: "Comments",
          data: commentsData,
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.5)",
        },
      ],
    }
  }, [data])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Engagement Trends",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7,
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  }

  return (
    <div className="h-[300px] sm:h-[400px]">
      <Line options={options} data={chartData} />
    </div>
  )
}

export default EngagementTrends

