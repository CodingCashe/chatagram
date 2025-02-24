import { InstagramProfileCard } from "@/components/global/profile/InstagramProfileCard"
import { getIntegration } from "@/actions/integrations/queries"
import { onCurrentUser } from "@/actions/user"

export default async function InstagramDashboard() {
  const user = await onCurrentUser()
  const integrationData = await getIntegration(user.id)

  if (!integrationData || integrationData.integrations.length === 0) {
    return <div>No Instagram integration found</div>
  }

  const instagramData = integrationData.integrations[0]

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">My Account</h1>
      <InstagramProfileCard
        username={instagramData.username}
        fullName={instagramData.fullName}
        profilePicture={instagramData.profilePicture}
        followersCount={instagramData.followersCount}
        followingCount={instagramData.followingCount}
        postsCount={instagramData.postsCount}
      />
    </div>
  )
}

