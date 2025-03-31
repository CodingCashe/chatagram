"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Copy, CheckCircle, Facebook, Twitter, LinkedinIcon as LinkedIn ,MessageCircle} from "lucide-react"
import { generateReferralLink } from "@/actions/new-referral/referral-actions"

interface AffiliateLinksProps {
  affiliateId: string
}

export default function AffiliateLinks({ affiliateId }: AffiliateLinksProps) {
  const [referralLink, setReferralLink] = useState("")
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchReferralLink = async () => {
      try {
        // Get the base URL
        const baseUrl = window.location.origin

        const result = await generateReferralLink(affiliateId, baseUrl)

        if (result.success) {
          setReferralLink(result.referralLink||'https://coursecrafts.com')
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to generate referral link",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error generating referral link:", error)
        toast({
          title: "Error",
          description: "Failed to generate referral link",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReferralLink()
  }, [affiliateId, toast])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const getEncodedLink = () => {
    return encodeURIComponent(referralLink)
  }

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${getEncodedLink()}`,
    twitter: `https://twitter.com/intent/tweet?url=${getEncodedLink()}&text=Check out this awesome product!`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${getEncodedLink()}`,
    whatsapp: `https://api.whatsapp.com/send?text=Check out this awesome product! ${getEncodedLink()}`,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link to earn commissions on referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={loading ? "Loading..." : referralLink} readOnly className="font-mono text-sm" />
            <Button variant="outline" onClick={() => copyToClipboard(referralLink)} disabled={loading || !referralLink}>
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promotional Tools</CardTitle>
          <CardDescription>Use these tools to promote your referral link</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="social">
            <TabsList className="mb-4">
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="email">Email Template</TabsTrigger>
              <TabsTrigger value="banners">Banners</TabsTrigger>
            </TabsList>

            <TabsContent value="social" className="space-y-4">
              <h3 className="text-lg font-semibold">Share on Social Media</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareLinks.facebook, "_blank")}
                  disabled={loading || !referralLink}
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareLinks.facebook, "_blank")}
                  disabled={loading || !referralLink}
                >
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareLinks.twitter, "_blank")}
                  disabled={loading || !referralLink}
                >
                  <Twitter className="h-5 w-5 text-sky-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareLinks.linkedin, "_blank")}
                  disabled={loading || !referralLink}
                >
                  <LinkedIn className="h-5 w-5 text-blue-700" />
                </Button>
              </div>

              <div className="space-y-2 mt-6">
                <h4 className="text-sm font-medium">Suggested Caption:</h4>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm">
                    I&apos;ve been using this amazing platform and thought you might like it too! Sign up using my link and
                    get started today.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      "I've been using this amazing platform and thought you might like it too! Sign up using my link and get started today.",
                    )
                  }
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Caption
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <h3 className="text-lg font-semibold">Email Template</h3>
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm mb-2">Subject: A tool I think you&apos;ll love</p>
                <p className="text-sm">
                  Hi [Name],
                  <br />
                  <br />
                  I&apos;ve been using this platform for a while now and it&apos;s been a game-changer for my dm automation. I thought
                  you might find it useful too!
                  <br />
                  <br />
                  Here&apos;s my referral link if you want to check it out:
                  <br />
                  [Your Referral Link]
                  <br />
                  <br />
                  Let me know if you have any questions!
                  <br />
                  <br />
                  Best,
                  <br />
                  [Your Name]
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  copyToClipboard(`Hi There,
                    I've been using this platform for a while now and it's been a game-changer for my workflow. I thought you might find it useful too!

                    Here's my referral link if you want to check it out:
                    ${referralLink}

                    Let me know if you have any questions!

                    Best,
                    [Cashe]`)
                }
                disabled={loading || !referralLink}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Email Template
              </Button>
            </TabsContent>

            <TabsContent value="banners" className="space-y-4">
              <h3 className="text-lg font-semibold">Banner Images</h3>
              <p className="text-sm text-muted-foreground">
                Use these banner images on your website or blog and link them to your referral URL.
              </p>

              <div className="grid gap-4 mt-4">
                <div className="border rounded-md p-4">
                  <div className="aspect-[5/1] bg-gradient-to-r from-purple-500 to-indigo-500 rounded flex items-center justify-center mb-2">
                    <p className="text-white font-bold text-xl">Join Today and Save!</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">728×90 px</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // In a real implementation, this would provide HTML code for embedding
                        const html = `<a href="${referralLink}"><img src="banner1.jpg" alt="Banner" width="728" height="90"></a>`
                        copyToClipboard(html)
                      }}
                      disabled={loading || !referralLink}
                    >
                      <Copy className="mr-2 h-3 w-3" />
                      Copy HTML
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="aspect-[1/1] bg-gradient-to-br from-emerald-500 to-teal-700 rounded flex items-center justify-center mb-2">
                    <p className="text-white font-bold text-xl">Get Started!</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">300×300 px</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // In a real implementation, this would provide HTML code for embedding
                        const html = `<a href="${referralLink}"><img src="banner2.jpg" alt="Banner" width="300" height="300"></a>`
                        copyToClipboard(html)
                      }}
                      disabled={loading || !referralLink}
                    >
                      <Copy className="mr-2 h-3 w-3" />
                      Copy HTML
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracking Tips</CardTitle>
          <CardDescription>Maximize your affiliate earnings with these tips</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Always use your referral link when sharing on social media or via email.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Track which platforms are generating the most conversions to focus your efforts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Use URL shorteners for cleaner links in social media posts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Create targeted content that showcases the benefits of the product.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Engage with potential customers to answer questions about the product.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

