import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Edit2, Trash2 } from "lucide-react"

interface PendingPostsProps {
  posts: any[]
}

const PendingPosts: React.FC<PendingPostsProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled for {new Date(post.scheduledDate).toLocaleString()}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">{post.caption.substring(0, 100)}...</p>
            <div className="flex justify-end space-x-2">
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default PendingPosts

