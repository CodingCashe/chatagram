'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Database, Bot, BarChart3, Search, Upload, UserPlus } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

 


export default function Home() {

  const router = useRouter()
  const pathname = usePathname()
  const slugMatch = pathname.match(/^\/dashboard\/([^/]+)/)
  const slug = slugMatch ? slugMatch[1] : ""

  // Unified navigation handler
  const handleNavigation = (path: string) => {
    router.push(`/dashboard/${slug}/${path}`);
  };




  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-4 lg:py-5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h4 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Influencer Discovery & Management
                </h4>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Source, analyze, and manage influencers for your marketing campaigns with our comprehensive platform.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={`/dashboard/${slug}/influencer/influencers/discover`}>
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <Search className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Discover Influencers</CardTitle>
                  <CardDescription>
                    Find the perfect influencers for your campaigns using multiple data sources.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/${slug}/influencer/influencers/discover`}>
                  
                    <Button variant="outline" className="w-full">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <Database className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Data Integrations</CardTitle>
                  <CardDescription>Connect to Instagram API and third-party data providers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/${slug}/influencer/integrations`}>
                    <Button variant="outline" className="w-full">
                      Configure
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <UserPlus className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Influencer Portal</CardTitle>
                  <CardDescription>Let influencers sign up and manage their profiles directly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/${slug}/influencer/portal/settings`}>
                    <Button variant="outline" className="w-full">
                      Manage
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <Upload className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Import Lists</CardTitle>
                  <CardDescription>Upload and manage your existing influencer contacts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/${slug}/influencer/influencers/import`}>
                    <Button variant="outline" className="w-full">
                      Import
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <BarChart3 className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Campaign Analytics</CardTitle>
                  <CardDescription>Track and analyze influencer campaign performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/${slug}/influencer/campaigns/analytics`}>
                    <Button variant="outline" className="w-full">
                      View Analytics
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <Bot className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>AI Discovery</CardTitle>
                  <CardDescription>Use AI to find influencers based on content and engagement.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/${slug}/influencer/influencers/ai-discovery`}>
                    <Button variant="outline" className="w-full">
                      Discover
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

