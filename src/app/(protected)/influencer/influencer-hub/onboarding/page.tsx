"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  User,
  AtSign,
  MapPin,
  Tag,
  ImageIcon,
  LinkIcon,
  Instagram,
  Youtube,
  Twitter,
  DollarSign,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { createInfluencerProfile, uploadProfileImage, connectSocialAccount } from "@/actions/influencer-hub"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

type ConnectSocialResponse = {
  status: number;
  data: {
    platform: string;
    username: string;
  };
};

export default function InfluencerOnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    niche: "",
    tags: [] as string[],
    socialLinks: {
      instagram: "",
      youtube: "",
      twitter: "",
      tiktok: "",
      website: "",
    },
    contentTypes: [] as string[],
    rates: {
      postRate: "",
      videoRate: "",
      storyRate: "",
    },
    contentSamples: [] as { url: string; type: string }[],
    termsAccepted: false,
  })

  const totalSteps = 5
  const progress = Math.round((step / totalSteps) * 100)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      
      if (parent === "socialLinks") {
        setFormData(prev => ({
          ...prev,
          socialLinks: {
            ...prev.socialLinks,
            [child as keyof typeof prev.socialLinks]: value,
          },
        }));
      }
      // Add other nested objects here if needed
      else {
        throw new Error(`Unknown nested field: ${parent}`);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name as keyof typeof prev]: value,
      }));
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...(prev[name as keyof typeof prev] as string[]), value],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
      }))
    }
  }

  const handleTermsChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, termsAccepted: checked }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImageFile(file)

      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleContentSampleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // In a real app, you would upload this to your storage
      // For now, we'll create a temporary URL
      const url = URL.createObjectURL(file)
      const type = file.type.startsWith("image/") ? "image" : "video"

      setFormData((prev) => ({
        ...prev,
        contentSamples: [...prev.contentSamples, { url, type }],
      }))
    }
  }

  const handleConnectSocial = async (platform: string) => {
    try {
      setLoading(true)

      // In a real app, this would initiate OAuth flow
      const result = await connectSocialAccount(platform)

      if (result.status === 200) {
        handleSocialChange(platform, result.data.username)

        toast({
          title: "Account connected",
          description: `Your ${platform} account has been successfully connected.`,
        })
      } else {
        toast({
          title: "Connection failed",
          description: typeof result.data === "string" ? result.data : `Failed to connect ${platform} account.`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(`Error connecting ${platform} account:`, error)
      toast({
        title: "Connection error",
        description: `An error occurred while connecting your ${platform} account.`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      toast({
        title: "Terms required",
        description: "You must accept the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Upload profile image if selected
      let profileImageUrl = null
      if (profileImageFile) {
        const imageResult = await uploadProfileImage(profileImageFile)
        if (imageResult.status === 200) {
          profileImageUrl = imageResult.data.url
        } else {
          throw new Error("Failed to upload profile image")
        }
      }

      // Create profile
      const result = await createInfluencerProfile({
        ...formData,
        profilePicture: profileImageUrl || "https://imageurl.com",
      })

      if (result.status === 200) {
        toast({
          title: "Profile created",
          description: "Your influencer profile has been created successfully.",
        })

        // Redirect to influencer hub
        router.push("/influencer-hub")
      } else {
        toast({
          title: "Error",
          description: typeof result.data === "string" ? result : "Failed to create profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating profile:", error)
      toast({
        title: "Error",
        description: "An error occurred while creating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Influencer Profile</CardTitle>
          <CardDescription>
            Complete your profile to connect with brands and receive collaboration opportunities
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {step} of {totalSteps}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 cursor-pointer border-2 border-primary/50">
                    <AvatarImage src={profileImage || ""} alt="Profile" />
                    <AvatarFallback>{formData.name ? formData.name.charAt(0) : <User />}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0">
                    <Label htmlFor="profile-image" className="cursor-pointer">
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Upload className="h-4 w-4" />
                      </div>
                    </Label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Upload a professional profile photo</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        name="username"
                        placeholder="Your unique username"
                        className="pl-10"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">This will be your unique identifier on the platform</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell brands about yourself and your content"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">{formData.bio.length}/500 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, Country"
                          className="pl-10"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="niche">Primary Niche</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Select value={formData.niche} onValueChange={(value) => handleSelectChange("niche", value)}>
                          <SelectTrigger id="niche" className="pl-10">
                            <SelectValue placeholder="Select your niche" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="fitness">Fitness</SelectItem>
                            <SelectItem value="travel">Travel</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Media Accounts</h3>
              <p className="text-muted-foreground">
                Connect your social media accounts to verify your following and enhance your profile
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">Connect your Instagram account</p>
                    </div>
                  </div>

                  {formData.socialLinks.instagram ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">@{formData.socialLinks.instagram}</p>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => handleConnectSocial("instagram")} disabled={loading}>
                      Connect
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">YouTube</p>
                      <p className="text-sm text-muted-foreground">Connect your YouTube channel</p>
                    </div>
                  </div>

                  {formData.socialLinks.youtube ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{formData.socialLinks.youtube}</p>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => handleConnectSocial("youtube")} disabled={loading}>
                      Connect
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Twitter className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-muted-foreground">Connect your Twitter account</p>
                    </div>
                  </div>

                  {formData.socialLinks.twitter ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">@{formData.socialLinks.twitter}</p>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => handleConnectSocial("twitter")} disabled={loading}>
                      Connect
                    </Button>
                  )}
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="website">Website or Blog (Optional)</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      name="socialLinks.website"
                      placeholder="https://yourwebsite.com"
                      className="pl-10"
                      value={formData.socialLinks.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Why connect your accounts?</AlertTitle>
                <AlertDescription>
                  Connecting your social accounts helps verify your following and increases your chances of being
                  discovered by brands. We&apos;ll never post without your permission.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Content & Expertise</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Content Types</Label>
                  <p className="text-sm text-muted-foreground">Select the types of content you create</p>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { id: "photos", label: "Photos" },
                      { id: "videos", label: "Videos" },
                      { id: "reels", label: "Reels/Short Videos" },
                      { id: "stories", label: "Stories" },
                      { id: "blogs", label: "Blog Posts" },
                      { id: "reviews", label: "Product Reviews" },
                      { id: "tutorials", label: "Tutorials" },
                      { id: "livestreams", label: "Livestreams" },
                    ].map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={formData.contentTypes.includes(type.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("contentTypes", type.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={type.id} className="cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label>Tags</Label>
                  <p className="text-sm text-muted-foreground">Select tags that describe your content (up to 5)</p>

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[
                      "Sustainable",
                      "Luxury",
                      "Budget-friendly",
                      "Vegan",
                      "Organic",
                      "Minimalist",
                      "Colorful",
                      "Vintage",
                      "Modern",
                      "DIY",
                      "Family-friendly",
                      "Outdoor",
                      "Urban",
                      "Wellness",
                      "Spiritual",
                      "Tech",
                      "Gadgets",
                      "Home decor",
                      "Cooking",
                      "Baking",
                      "Fitness",
                      "Yoga",
                      "Running",
                      "Weightlifting",
                      "Nutrition",
                      "Skincare",
                      "Makeup",
                      "Haircare",
                      "Fashion",
                      "Accessories",
                    ].map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={formData.tags.includes(tag)}
                          onCheckedChange={(checked) => handleCheckboxChange("tags", tag, checked as boolean)}
                          disabled={formData.tags.length >= 5 && !formData.tags.includes(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label>Content Samples</Label>
                  <p className="text-sm text-muted-foreground">Upload examples of your best content</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {formData.contentSamples.map((sample, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                        {sample.type === "image" ? (
                          <Image
                            src={sample.url || "/placeholder.svg"}
                            alt="Content sample"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-muted">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="relative aspect-square rounded-md border border-dashed flex flex-col items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Sample</p>
                      <Input
                        type="file"
                        accept="image/*,video/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleContentSampleUpload}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Collaboration Rates</h3>
              <p className="text-muted-foreground">
                Set your standard rates for different types of content. You can always negotiate specific rates for each
                campaign.
              </p>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="postRate">Standard Post Rate (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="postRate"
                      name="rates.postRate"
                      type="number"
                      placeholder="0"
                      className="pl-10"
                      value={formData.rates.postRate}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Your standard rate for a single social media post</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoRate">Video Content Rate (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="videoRate"
                      name="rates.videoRate"
                      type="number"
                      placeholder="0"
                      className="pl-10"
                      value={formData.rates.videoRate}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Your standard rate for video content</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storyRate">Story/Reel Rate (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="storyRate"
                      name="rates.storyRate"
                      type="number"
                      placeholder="0"
                      className="pl-10"
                      value={formData.rates.storyRate}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Your standard rate for stories or short-form content</p>
                </div>
              </div>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Rate Visibility</AlertTitle>
                <AlertDescription>
                  Your rates will only be visible to brands after they express interest in working with you. You can
                  always negotiate specific rates for each campaign.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review & Submit</h3>

              <div className="space-y-6 mt-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Profile Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Name:</div>
                    <div>{formData.name}</div>

                    <div className="text-muted-foreground">Username:</div>
                    <div>@{formData.username}</div>

                    <div className="text-muted-foreground">Location:</div>
                    <div>{formData.location}</div>

                    <div className="text-muted-foreground">Niche:</div>
                    <div>{formData.niche}</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Connected Accounts</h4>
                  <div className="space-y-2">
                    {formData.socialLinks.instagram && (
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-500" />
                        <span>@{formData.socialLinks.instagram}</span>
                      </div>
                    )}

                    {formData.socialLinks.youtube && (
                      <div className="flex items-center gap-2">
                        <Youtube className="h-4 w-4 text-red-500" />
                        <span>{formData.socialLinks.youtube}</span>
                      </div>
                    )}

                    {formData.socialLinks.twitter && (
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-blue-500" />
                        <span>@{formData.socialLinks.twitter}</span>
                      </div>
                    )}

                    {formData.socialLinks.website && (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        <span>{formData.socialLinks.website}</span>
                      </div>
                    )}

                    {!formData.socialLinks.instagram &&
                      !formData.socialLinks.youtube &&
                      !formData.socialLinks.twitter &&
                      !formData.socialLinks.website && <p className="text-muted-foreground">No accounts connected</p>}
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Content & Expertise</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Content Types:</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.contentTypes.map((type) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                        {formData.contentTypes.length === 0 && (
                          <p className="text-sm text-muted-foreground">None selected</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                        {formData.tags.length === 0 && <p className="text-sm text-muted-foreground">None selected</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Collaboration Rates</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Standard Post:</div>
                    <div>${formData.rates.postRate || "0"}</div>

                    <div className="text-muted-foreground">Video Content:</div>
                    <div>${formData.rates.videoRate || "0"}</div>

                    <div className="text-muted-foreground">Story/Reel:</div>
                    <div>${formData.rates.storyRate || "0"}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 mt-6">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleTermsChange(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </Label>
                    <p className="text-sm text-muted-foreground">I agree to the terms of service and privacy policy.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}

          {step < totalSteps ? (
            <Button onClick={handleNext}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading || !formData.termsAccepted}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                "Create Profile"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

