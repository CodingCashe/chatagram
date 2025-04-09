"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { getAudienceInsights } from "@/actions/influencer-relations/influencer"

export function AudienceInsights() {
  const [audience, setAudience] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("demographics")

  useEffect(() => {
    const fetchAudience = async () => {
      try {
        const { status, data, message } = await getAudienceInsights()

        if (status === 200 && data) {
          setAudience(data)
        } else {
          setError(message || "Failed to load audience insights")
        }
      } catch (err) {
        setError("An error occurred while fetching audience insights")
      } finally {
        setLoading(false)
      }
    }

    fetchAudience()
  }, [])

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--primary) / 0.6)",
    "hsl(var(--primary) / 0.4)",
    "hsl(var(--primary) / 0.2)",
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Audience Insights</CardTitle>
            <CardDescription>Who your content reaches</CardDescription>
          </div>
          <div className="rounded-full bg-primary/10 p-1.5">
            <Users className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demographics" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics">
            {loading ? (
              <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                {error}
              </div>
            ) : !audience ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                No audience data available
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Age Distribution</h4>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audience.ageGroups}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                        >
                          {audience.ageGroups.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: any) => [`${value}%`, "Percentage"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          formatter={(value) => <span className="text-xs">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Gender Distribution</h4>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audience.gender}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                        >
                          {audience.gender.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: any) => [`${value}%`, "Percentage"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          formatter={(value) => <span className="text-xs">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="locations">
            {loading ? (
              <div className="flex h-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                {error}
              </div>
            ) : !audience ? (
              <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                No audience data available
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Top Locations</h4>
                <div className="space-y-3">
                  {audience.topLocations.map((location: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{location.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 overflow-hidden rounded-full bg-muted">
                          <div className="h-2 bg-primary" style={{ width: `${location.value}%` }} />
                        </div>
                        <span className="text-xs font-medium">{location.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium">Audience Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {audience.interests.map((interest: any, index: number) => (
                      <div
                        key={index}
                        className="rounded-full border px-3 py-1 text-xs"
                        style={{
                          opacity: 0.4 + (interest.value / 100) * 0.6,
                          borderColor: `hsl(var(--primary) / ${0.2 + (interest.value / 100) * 0.8})`,
                          color: `hsl(var(--primary))`,
                        }}
                      >
                        {interest.name} ({interest.value}%)
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
