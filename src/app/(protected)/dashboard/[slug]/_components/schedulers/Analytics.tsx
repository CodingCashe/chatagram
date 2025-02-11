// "use client"

// import { useState, useEffect } from "react"
// import { Bar, Line, Doughnut } from "react-chartjs-2"
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { motion } from "framer-motion"

// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

// interface AnalyticsData {
//   likes: number[]
//   comments: number[]
//   shares: number[]
//   reach: number[]
//   impressions: number[]
//   followers: number[]
//   dates: string[]
// }

// export default function Analytics() {
//   const [data, setData] = useState<AnalyticsData | null>(null)
//   const [timeRange, setTimeRange] = useState("week")

//   useEffect(() => {
//     // TODO: Fetch analytics data from API
//     const fetchData = async () => {
//       const response = await fetch(`/api/analytics?range=${timeRange}`)
//       const analyticsData = await response.json()
//       setData(analyticsData)
//     }
//     fetchData()
//   }, [timeRange])

//   if (!data) return <div>Loading analytics...</div>

//   const engagementData = {
//     labels: data.dates,
//     datasets: [
//       {
//         label: "Likes",
//         data: data.likes,
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         borderColor: "rgb(255, 99, 132)",
//         borderWidth: 1,
//       },
//       {
//         label: "Comments",
//         data: data.comments,
//         backgroundColor: "rgba(54, 162, 235, 0.5)",
//         borderColor: "rgb(54, 162, 235)",
//         borderWidth: 1,
//       },
//       {
//         label: "Shares",
//         data: data.shares,
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//         borderColor: "rgb(75, 192, 192)",
//         borderWidth: 1,
//       },
//     ],
//   }

//   const reachData = {
//     labels: data.dates,
//     datasets: [
//       {
//         label: "Reach",
//         data: data.reach,
//         borderColor: "rgb(255, 159, 64)",
//         backgroundColor: "rgba(255, 159, 64, 0.5)",
//         tension: 0.1,
//       },
//       {
//         label: "Impressions",
//         data: data.impressions,
//         borderColor: "rgb(153, 102, 255)",
//         backgroundColor: "rgba(153, 102, 255, 0.5)",
//         tension: 0.1,
//       },
//     ],
//   }

//   const followerData = {
//     labels: ["Gained", "Lost"],
//     datasets: [
//       {
//         data: [
//           data.followers[data.followers.length - 1] - data.followers[0],
//           Math.abs(data.followers[0] - data.followers[data.followers.length - 1]),
//         ],
//         backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
//         borderColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
//       },
//     ],
//   }

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
//       <Tabs defaultValue="week" onValueChange={(value) => setTimeRange(value)}>
//         <TabsList className="grid w-full grid-cols-3 rounded-xl bg-gray-800/50 p-1">
//           <TabsTrigger
//             value="week"
//             className="rounded-lg text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
//           >
//             Week
//           </TabsTrigger>
//           <TabsTrigger
//             value="month"
//             className="rounded-lg text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
//           >
//             Month
//           </TabsTrigger>
//           <TabsTrigger
//             value="year"
//             className="rounded-lg text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
//           >
//             Year
//           </TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="bg-gray-800/50 border-2 border-green-500/50 rounded-xl overflow-hidden shadow-lg shadow-green-500/20 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-xl font-bold text-white">Engagement Overview</CardTitle>
//             <CardDescription className="text-gray-300">Likes, Comments, and Shares</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Bar
//               data={engagementData}
//               options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
//             />
//           </CardContent>
//         </Card>
//         <Card className="bg-gray-800/50 border-2 border-orange-500/50 rounded-xl overflow-hidden shadow-lg shadow-orange-500/20 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-xl font-bold text-white">Reach & Impressions</CardTitle>
//             <CardDescription className="text-gray-300">Post reach and impressions over time</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Line
//               data={reachData}
//               options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
//             />
//           </CardContent>
//         </Card>
//         <Card className="bg-gray-800/50 border-2 border-blue-500/50 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-xl font-bold text-white">Follower Growth</CardTitle>
//             <CardDescription className="text-gray-300">Gained vs Lost Followers</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Doughnut
//               data={followerData}
//               options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
//             />
//           </CardContent>
//         </Card>
//         <Card className="bg-gray-800/50 border-2 border-purple-500/50 rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-xl font-bold text-white">Key Metrics</CardTitle>
//             <CardDescription className="text-gray-300">Summary of important statistics</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-green-400">{data.likes.reduce((a, b) => a + b, 0)}</p>
//                 <p className="text-sm text-gray-300">Total Likes</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-blue-400">{data.comments.reduce((a, b) => a + b, 0)}</p>
//                 <p className="text-sm text-gray-300">Total Comments</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-yellow-400">{data.shares.reduce((a, b) => a + b, 0)}</p>
//                 <p className="text-sm text-gray-300">Total Shares</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-purple-400">{data.followers[data.followers.length - 1]}</p>
//                 <p className="text-sm text-gray-300">Current Followers</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </motion.div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

interface AnalyticsData {
  likes: number[]
  comments: number[]
  shares: number[]
  reach: number[]
  impressions: number[]
  followers: number[]
  dates: string[]
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState("week")

  useEffect(() => {
    // TODO: Fetch analytics data from API
    const fetchData = async () => {
      const response = await fetch(`/api/analytics?range=${timeRange}`)
      const analyticsData = await response.json()
      setData(analyticsData)
    }
    fetchData()
  }, [timeRange])

  if (!data) return <div>Loading analytics...</div>

  const engagementData = {
    labels: data.dates,
    datasets: [
      {
        label: "Likes",
        data: data.likes,
        backgroundColor: "rgba(200, 200, 200, 0.5)",
        borderColor: "rgb(200, 200, 200)",
        borderWidth: 1,
      },
      {
        label: "Comments",
        data: data.comments,
        backgroundColor: "rgba(150, 150, 150, 0.5)",
        borderColor: "rgb(150, 150, 150)",
        borderWidth: 1,
      },
      {
        label: "Shares",
        data: data.shares,
        backgroundColor: "rgba(100, 100, 100, 0.5)",
        borderColor: "rgb(100, 100, 100)",
        borderWidth: 1,
      },
    ],
  }

  const reachData = {
    labels: data.dates,
    datasets: [
      {
        label: "Reach",
        data: data.reach,
        borderColor: "rgb(200, 200, 200)",
        backgroundColor: "rgba(200, 200, 200, 0.5)",
        tension: 0.1,
      },
      {
        label: "Impressions",
        data: data.impressions,
        borderColor: "rgb(150, 150, 150)",
        backgroundColor: "rgba(150, 150, 150, 0.5)",
        tension: 0.1,
      },
    ],
  }

  const followerData = {
    labels: ["Gained", "Lost"],
    datasets: [
      {
        data: [
          data.followers[data.followers.length - 1] - data.followers[0],
          Math.abs(data.followers[0] - data.followers[data.followers.length - 1]),
        ],
        backgroundColor: ["rgba(200, 200, 200, 0.5)", "rgba(100, 100, 100, 0.5)"],
        borderColor: ["rgb(200, 200, 200)", "rgb(100, 100, 100)"],
      },
    ],
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Tabs defaultValue="week" onValueChange={(value) => setTimeRange(value)}>
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-gray-800 p-1">
          <TabsTrigger
            value="week"
            className="rounded-lg text-gray-300 data-[state=active]:bg-gray-600 data-[state=active]:text-white transition-all duration-300"
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            value="month"
            className="rounded-lg text-gray-300 data-[state=active]:bg-gray-600 data-[state=active]:text-white transition-all duration-300"
          >
            Month
          </TabsTrigger>
          <TabsTrigger
            value="year"
            className="rounded-lg text-gray-300 data-[state=active]:bg-gray-600 data-[state=active]:text-white transition-all duration-300"
          >
            Year
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-gray-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Engagement Overview</CardTitle>
              <CardDescription className="text-gray-300">Likes, Comments, and Shares</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar
                data={engagementData}
                options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-gray-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Reach & Impressions</CardTitle>
              <CardDescription className="text-gray-300">Post reach and impressions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Line
                data={reachData}
                options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-gray-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Follower Growth</CardTitle>
              <CardDescription className="text-gray-300">Gained vs Lost Followers</CardDescription>
            </CardHeader>
            <CardContent>
              <Doughnut
                data={followerData}
                options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gray-800 border-2 border-gray-600 rounded-xl overflow-hidden shadow-lg shadow-gray-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Key Metrics</CardTitle>
              <CardDescription className="text-gray-300">Summary of important statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-300">{data.likes.reduce((a, b) => a + b, 0)}</p>
                  <p className="text-sm text-gray-400">Total Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-300">{data.comments.reduce((a, b) => a + b, 0)}</p>
                  <p className="text-sm text-gray-400">Total Comments</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-300">{data.shares.reduce((a, b) => a + b, 0)}</p>
                  <p className="text-sm text-gray-400">Total Shares</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-300">{data.followers[data.followers.length - 1]}</p>
                  <p className="text-sm text-gray-400">Current Followers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

