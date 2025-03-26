"use client"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function EmailCampaignForm({
  campaign,
  onSuccess,
}: {
  campaign?: any
  onSuccess?: () => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">{campaign ? "Edit Campaign" : "Create New Campaign"}</h2>
        <p className="text-sm text-muted-foreground">
          This feature is coming soon. You'll be able to create and manage email campaigns.
        </p>
      </div>

      <Button
        onClick={() => {
          toast({
            title: "Coming soon",
            description: "This feature is not yet implemented",
          })
          if (onSuccess) onSuccess()
        }}
      >
        {campaign ? "Update Campaign" : "Create Campaign"}
      </Button>
    </div>
  )
}

