"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Eye, Instagram, Edit2, MoreVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ScheduledPost {
  id: string
  type: string
  content: string
  scheduledDate: string
  image: string
}

export default function ScheduledPosts() {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)

  useEffect(() => {
    // TODO: Fetch scheduled posts from API
    const fetchPosts = async () => {
      const response = await fetch("/api/scheduled-posts")
      const data = await response.json()
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    // TODO: Implement delete functionality
    await fetch(`/api/scheduled-posts/${id}`, { method: "DELETE" })
    setPosts(posts.filter((post) => post.id !== id))
  }

  const handleEdit = (post: ScheduledPost) => {
    setSelectedPost(post)
    // TODO: Implement edit functionality
  }

  return (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-700/50">
            <TableHead className="text-gray-300">Type</TableHead>
            <TableHead className="text-gray-300">Content</TableHead>
            <TableHead className="text-gray-300">Scheduled Date</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {posts.map((post) => (
              <motion.tr
                key={post.id}
                className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell className="text-gray-300">
                  <div className="flex items-center">
                    <Instagram className="mr-2 h-4 w-4" />
                    {post.type}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{post.content.substring(0, 50)}...</TableCell>
                <TableCell className="text-gray-300">{new Date(post.scheduledDate).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 text-white">
                        <DialogHeader>
                          <DialogTitle>Post Preview</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post preview"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <p className="mt-2">{post.content}</p>
                          <p className="mt-2 text-gray-400">
                            Scheduled for: {new Date(post.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-700 border-gray-600">
                        <DropdownMenuItem onClick={() => handleEdit(post)} className="text-gray-200 hover:bg-gray-600">
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(post.id)}
                          className="text-red-400 hover:bg-gray-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  )
}

