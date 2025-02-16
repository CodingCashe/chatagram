// "use client"

// import type React from "react"

// import { useState } from "react"

// export default function PostScheduleForm({ userId }: { userId: string }) {
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setLoading(true)
//     setMessage("")

//     const formData = new FormData(event.currentTarget)
//     const caption = formData.get("caption") as string
//     const mediaUrl = formData.get("mediaUrl") as string

//     try {
//       const response = await fetch("/api/post-to-instagram", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, caption, mediaUrl }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMessage("Post successfully published to Instagram!")
//       } else {
//         setMessage(`Error: ${data.error || "Failed to post to Instagram"}`)
//       }
//     } catch (error) {
//       setMessage("An error occurred while trying to post.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
//           Caption
//         </label>
//         <textarea
//           id="caption"
//           name="caption"
//           rows={3}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">
//           Media URL
//         </label>
//         <input
//           type="url"
//           id="mediaUrl"
//           name="mediaUrl"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//           placeholder="https://example.com/image.jpg"
//         />
//       </div>
//       <button
//         type="submit"
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         disabled={loading}
//       >
//         {loading ? "Posting..." : "Post to Instagram"}
//       </button>
//       {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
//     </form>
//   )
// }


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { onCurrentUser } from "@/actions/user"

// export default function PostScheduleForm() {
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setLoading(true)
//     setMessage("")

//     const formData = new FormData(event.currentTarget)
//     const caption = formData.get("caption") as string
//     const mediaUrl = formData.get("mediaUrl") as string

//     try {
//       const user = await onCurrentUser()
//       if (!user) {
//         setMessage("User not authenticated")
//         setLoading(false)
//         return
//       }

//       const response = await fetch("/api/post-to-instagram", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: user.id,
//           caption,
//           mediaUrl,
//         }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMessage("Post successfully published to Instagram!")
//       } else {
//         setMessage(`Error: ${data.error || "Failed to post to Instagram"}`)
//       }
//     } catch (error) {
//       setMessage("An error occurred while trying to post.")
//       console.error("Error posting to Instagram:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
//           Caption
//         </label>
//         <textarea
//           id="caption"
//           name="caption"
//           rows={3}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">
//           Media URL
//         </label>
//         <input
//           type="url"
//           id="mediaUrl"
//           name="mediaUrl"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//           placeholder="https://example.com/image.jpg"
//         />
//       </div>
//       <button
//         type="submit"
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         disabled={loading}
//       >
//         {loading ? "Posting..." : "Post to Instagram"}
//       </button>
//       {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
//     </form>
//   )
// }


// 'use client'

// import { useState } from 'react';
// import { useUser } from '@clerk/nextjs';

// export default function PostScheduleForm() {
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { user } = useUser();

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const formData = new FormData(event.currentTarget);
//     const caption = formData.get('caption') as string;
//     const mediaUrl = formData.get('mediaUrl') as string;

//     if (!user) {
//       setMessage('User not authenticated');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/post-to-instagram', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           userId: user.id, // Use Clerk user ID
//           caption, 
//           mediaUrl 
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Post successfully published to Instagram!');
//       } else {
//         setMessage(`Error: ${data.error || 'Failed to post to Instagram'}`);
//       }
//     } catch (error) {
//       setMessage('An error occurred while trying to post.');
//       console.error('Error posting to Instagram:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
//         <textarea
//           id="caption"
//           name="caption"
//           rows={3}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">Media URL</label>
//         <input
//           type="url"
//           id="mediaUrl"
//           name="mediaUrl"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           required
//           placeholder="https://example.com/image.jpg"
//         />
//       </div>
//       <button
//         type="submit"
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         disabled={loading}
//       >
//         {loading ? 'Posting...' : 'Post to Instagram'}
//       </button>
//       {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
//     </form>
//   );
// }

"use client"

import type React from "react"

import { useState } from "react"

interface PostScheduleFormProps {
  userId: string
}

export default function PostScheduleForm({ userId }: PostScheduleFormProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(event.currentTarget)
    const caption = formData.get("caption") as string
    const mediaUrl = formData.get("mediaUrl") as string

    try {
      const response = await fetch("/api/post-to-instagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          caption,
          mediaUrl,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Post successfully published to Instagram!")
      } else {
        setMessage(`Error: ${data.error || "Failed to post to Instagram"}`)
      }
    } catch (error) {
      setMessage("An error occurred while trying to post.")
      console.error("Error posting to Instagram:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
          Caption
        </label>
        <textarea
          id="caption"
          name="caption"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">
          Media URL
        </label>
        <input
          type="url"
          id="mediaUrl"
          name="mediaUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post to Instagram"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  )
}

