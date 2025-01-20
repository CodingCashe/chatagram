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
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Engagement Trends",
      },
    },
  }

  return <Line options={options} data={chartData} />
}

export default EngagementTrends

