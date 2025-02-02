// import { InstagramProfileCard } from "@/components/global/profile/InstagramProfileCard"
// import { FollowerGrowthChart } from "@/components/global/profile/FollowerGrowthChart"
// import { getIntegration } from "@/actions/integrations/queries"
// import { onCurrentUser } from "@/actions/user"

// // This is a mock function to generate follower growth data
// // In a real application, you would fetch this data from your database
// function generateFollowerGrowthData(currentFollowers: number) {
//   const data = []
//   const now = new Date()
//   for (let i = 30; i >= 0; i--) {
//     const date = new Date(now)
//     date.setDate(date.getDate() - i)
//     data.push({
//       date: date.toISOString(),
//       followers: Math.floor(currentFollowers * (1 - i * 0.01)),
//     })
//   }
//   return data
// }

// export default async function InstagramDashboard() {
//   const user = await onCurrentUser()
//   const integration = await getIntegration(user.id)

//   if (!integration || integration.integrations.length === 0) {
//     return <div>No Instagram integration found</div>
//   }

//   const instagramData = integration.integrations[0]
//   const followerGrowthData = generateFollowerGrowthData(instagramData.followersCount)

//   return (
//     <div className="container mx-auto p-4 space-y-8">
//       <h1 className="text-3xl font-bold">Instagram Dashboard</h1>
//       <InstagramProfileCard
//         username={instagramData.username}
//         fullName={instagramData.fullName}
//         profilePicture={instagramData.profilePicture}
//         followersCount={instagramData.followersCount}
//         followingCount={instagramData.followingCount}
//         postsCount={instagramData.postsCount}
//       />
//       <FollowerGrowthChart data={followerGrowthData} />
//     </div>
//   )
// }

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
      <h1 className="text-3xl font-bold">Instagram Dashboard</h1>
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

