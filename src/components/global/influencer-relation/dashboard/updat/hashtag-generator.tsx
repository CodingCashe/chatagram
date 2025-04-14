"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Hash, Sparkles, TrendingUp } from "lucide-react"

// Sample hashtag data
const sampleHashtags = {
  fashion: [
    "#fashionista",
    "#ootd",
    "#styleinspo",
    "#fashionblogger",
    "#outfitoftheday",
    "#fashionstyle",
    "#fashionable",
    "#fashiongram",
    "#fashiondiaries",
    "#fashionaddict",
    "#fashionlover",
    "#fashionweek",
    "#fashionphotography",
    "#fashioninspiration",
    "#fashiondesigner",
  ],
  beauty: [
    "#beauty",
    "#makeup",
    "#skincare",
    "#beautytips",
    "#beautyblogger",
    "#beautycare",
    "#beautyaddict",
    "#beautyproducts",
    "#beautycommunity",
    "#beautyinfluencer",
    "#beautyhacks",
    "#beautyguru",
    "#beautytrends",
    "#beautyphotography",
    "#beautysalon",
  ],
  travel: [
    "#travel",
    "#travelphotography",
    "#travelgram",
    "#wanderlust",
    "#travelblogger",
    "#traveltheworld",
    "#travelholic",
    "#traveladdict",
    "#travellife",
    "#traveldiaries",
    "#traveler",
    "#travelguide",
    "#travelawesome",
    "#travelstoke",
    "#traveldeeper",
  ],
  fitness: [
    "#fitness",
    "#workout",
    "#gym",
    "#fitnessmotivation",
    "#fit",
    "#training",
    "#health",
    "#fitfam",
    "#bodybuilding",
    "#lifestyle",
    "#healthylifestyle",
    "#exercise",
    "#strong",
    "#fitnessjourney",
    "#fitnessaddict",
  ],
  food: [
    "#food",
    "#foodporn",
    "#foodie",
    "#instafood",
    "#foodphotography",
    "#foodstagram",
    "#foodlover",
    "#foodblogger",
    "#foodgasm",
    "#delicious",
    "#yummy",
    "#homemade",
    "#cooking",
    "#chef",
    "#healthyfood",
  ],
}

// Sample trending hashtags
const trendingHashtags = [
  { tag: "#sustainability", posts: "2.4M", growth: "+18%" },
  { tag: "#mentalhealthawareness", posts: "1.8M", growth: "+24%" },
  { tag: "#cleantok", posts: "3.2M", growth: "+15%" },
  { tag: "#financetips", posts: "950K", growth: "+32%" },
  { tag: "#plantbased", posts: "4.1M", growth: "+12%" },
]

export function HashtagGenerator() {
  const [category, setCategory] = useState("fashion")
  const [customTopic, setCustomTopic] = useState("")
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  const handleGenerate = () => {
    // In a real app, this would call an API
    // For demo purposes, we'll just use our sample data
    if (customTopic.trim()) {
      // Simulate generating hashtags for custom topic
      const randomCategory = Object.keys(sampleHashtags)[Math.floor(Math.random() * Object.keys(sampleHashtags).length)]
      setGeneratedHashtags(sampleHashtags[randomCategory as keyof typeof sampleHashtags].slice(0, 10))
    } else {
      setGeneratedHashtags(sampleHashtags[category as keyof typeof sampleHashtags])
    }
  }

  const toggleHashtag = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter((tag) => tag !== hashtag))
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag])
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedHashtags.join(" "))
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Hashtag Research</CardTitle>
        <CardDescription>Find the perfect hashtags for your content</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generator" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-5 gap-2">
                <Button
                  variant={category === "fashion" ? "default" : "outline"}
                  onClick={() => setCategory("fashion")}
                  className={category === "fashion" ? "bg-violet-600 hover:bg-violet-700" : ""}
                >
                  Fashion
                </Button>
                <Button
                  variant={category === "beauty" ? "default" : "outline"}
                  onClick={() => setCategory("beauty")}
                  className={category === "beauty" ? "bg-pink-600 hover:bg-pink-700" : ""}
                >
                  Beauty
                </Button>
                <Button
                  variant={category === "travel" ? "default" : "outline"}
                  onClick={() => setCategory("travel")}
                  className={category === "travel" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Travel
                </Button>
                <Button
                  variant={category === "fitness" ? "default" : "outline"}
                  onClick={() => setCategory("fitness")}
                  className={category === "fitness" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  Fitness
                </Button>
                <Button
                  variant={category === "food" ? "default" : "outline"}
                  onClick={() => setCategory("food")}
                  className={category === "food" ? "bg-amber-600 hover:bg-amber-700" : ""}
                >
                  Food
                </Button>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Or enter a custom topic..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                />
                <Button onClick={handleGenerate} className="bg-indigo-600 hover:bg-indigo-700">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>

              {generatedHashtags.length > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((hashtag, index) => (
                      <Badge
                        key={index}
                        variant={selectedHashtags.includes(hashtag) ? "default" : "outline"}
                        className={`cursor-pointer ${selectedHashtags.includes(hashtag) ? "bg-indigo-600" : "hover:bg-indigo-600/10"}`}
                        onClick={() => toggleHashtag(hashtag)}
                      >
                        <Hash className="mr-1 h-3 w-3" />
                        {hashtag.replace("#", "")}
                      </Badge>
                    ))}
                  </div>

                  {selectedHashtags.length > 0 && (
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Selected Hashtags ({selectedHashtags.length})</p>
                        <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground break-all">{selectedHashtags.join(" ")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="rounded-md border">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="font-medium">Trending Hashtags</p>
                <TrendingUp className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="divide-y">
                {trendingHashtags.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">
                        <Hash className="mr-1 h-3 w-3" />
                        {item.tag.replace("#", "")}
                      </Badge>
                      <span className="ml-3 text-sm text-muted-foreground">{item.posts} posts</span>
                    </div>
                    <span className="text-sm font-medium text-emerald-500">{item.growth}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Trending hashtags are updated daily based on platform engagement and growth metrics.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
