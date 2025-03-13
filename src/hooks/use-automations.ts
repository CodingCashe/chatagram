
"use client"

import type React from "react"

import { z } from "zod"
import {
  createAutomations,
  deleteAutomation,
  deleteKeyword,
  saveKeyword,
  saveListener,
  savePosts,
  saveScheduledPosts,
  saveTrigger,
  updateAutomationName,
} from "@/actions/automations"
import { useMutationData } from "./use-mutation-data"
import { useEffect, useRef, useState } from "react"
import useZodForm from "./use-zod-form"
import { type AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { TRIGGER } from "@/redux/slices/automation"
import type { ScheduledPost } from "@/actions/schedule/schedule-post"

export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(["create-automation"], () => createAutomations(id), "user-automations")

  return { isPending, mutate }
}

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enableEdit = () => setEdit(true)
  const disableEdit = () => setEdit(false)

  const { isPending, mutate } = useMutationData(
    ["update-automation"],
    (data: { name: string }) => updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit,
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node | null)) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value })
        } else {
          disableEdit()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mutate])

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  }
}

export const useListener = (id: string) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMARTAI" | null>(null)

  const promptSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string(),
  })

  const { isPending, mutate } = useMutationData(
    ["create-listener"],
    (data: { prompt: string; reply: string }) => saveListener(id, listener || "MESSAGE", data.prompt, data.reply),
    "automation-info",
  )

  const { errors, onFormSubmit, register, reset, watch } = useZodForm(promptSchema, mutate)

  const onSetListener = (type: "SMARTAI" | "MESSAGE") => setListener(type)
  return { onSetListener, register, onFormSubmit, listener, isPending }
}

export const useTriggers = (id: string) => {
  const types = useAppSelector((state) => state.AutmationReducer.trigger?.types)

  const dispatch: AppDispatch = useDispatch()

  const onSetTrigger = (type: "COMMENT" | "DM") => dispatch(TRIGGER({ trigger: { type } }))

  const { isPending, mutate } = useMutationData(
    ["add-trigger"],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    "automation-info",
  )

  const onSaveTrigger = () => mutate({ types })
  return { types, onSetTrigger, onSaveTrigger, isPending }
}

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState("")
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

  const { mutate } = useMutationData(
    ["add-keyword"],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    "automation-info",
    () => setKeyword(""),
  )

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate({ keyword })
      setKeyword("")
    }
  }

  const { mutate: deleteMutation } = useMutationData(
    ["delete-keyword"],
    (data: { id: string }) => deleteKeyword(data.id),
    "automation-info",
  )

  const addKeyword = (newKeyword: string) => {
    if (newKeyword.trim()) {
      mutate({ keyword: newKeyword })
    }
  }

  return { keyword, onValueChange, onKeyPress, deleteMutation, addKeyword }
}

export const useAutomationPosts = (id: string) => {
  const [posts, setPosts] = useState<
    {
      postid: string
      caption?: string
      media: string
      mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"
    }[]
  >([])

  // Add state for scheduled posts
  const [scheduledPosts, setScheduledPosts] = useState<string[]>([])

  const onSelectPost = (post: {
    postid: string
    caption?: string
    media: string
    mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"
  }) => {
    setPosts((prevItems) => {
      if (prevItems.find((p) => p.postid === post.postid)) {
        return prevItems.filter((item) => item.postid !== post.postid)
      } else {
        return [...prevItems, post]
      }
    })
  }

  // Add function to handle scheduled post selection
  const onSelectScheduledPost = (post: ScheduledPost) => {
    // Ensure post.id exists before proceeding
    if (!post.id) return

    setScheduledPosts((prevItems) => {
      if (prevItems.includes(post.id)) {
        return prevItems.filter((item) => item !== post.id)
      } else {
        return [...prevItems, post.id]
      }
    })
  }

  const { mutate, isPending } = useMutationData(
    ["attach-posts"],
    async (data?: { posts?: typeof posts; scheduledPostIds?: string[] }) => {
      // Use provided posts or current state
      const postsToSave = data?.posts || posts

      // Use provided scheduledPostIds or current state
      const scheduledPostIdsToSave = data?.scheduledPostIds || scheduledPosts

      // Save published posts
      const publishedResult = await savePosts(id, postsToSave)

      // Always attempt to save scheduled posts, even if the array is empty
      // This ensures the backend knows about the current state
      await saveScheduledPosts(id, scheduledPostIdsToSave)

      return publishedResult
    },
    "automation-info",
    () => {
      setPosts([])
      setScheduledPosts([])
    },
  )

  const { mutate: deleteMutation, isPending: isDeleting } = useMutationData(
    ["delete-automation"],
    async (data: { id: string }) => {
      try {
        const response = await deleteAutomation(data.id)
        if (response.status !== 200) throw new Error("Failed to delete automation")
        return response
      } catch (err) {
        console.error("Error deleting automation:", err)
        throw err
      }
    },
    "automation-info",
  )

  return {
    posts,
    onSelectPost,
    scheduledPosts,
    onSelectScheduledPost,
    mutate,
    isPending,
    deleteMutation,
    isDeleting,
  }
}



// "use client"

// import type React from "react"

// import { z } from "zod"
// import {
//   createAutomations,
//   deleteAutomation,
//   deleteKeyword,
//   saveKeyword,
//   saveListener,
//   savePosts,
//   saveScheduledPosts,
//   saveTrigger,
//   updateAutomationName,
// } from "@/actions/automations"
// import { useMutationData } from "./use-mutation-data"
// import { useEffect, useRef, useState } from "react"
// import useZodForm from "./use-zod-form"
// import { type AppDispatch, useAppSelector } from "@/redux/store"
// import { useDispatch } from "react-redux"
// import { TRIGGER } from "@/redux/slices/automation"
// import type { ScheduledPost } from "@/actions/schedule/schedule-post"

// export const useCreateAutomation = (id?: string) => {
//   const { isPending, mutate } = useMutationData(["create-automation"], () => createAutomations(id), "user-automations")

//   return { isPending, mutate }
// }

// export const useEditAutomation = (automationId: string) => {
//   const [edit, setEdit] = useState(false)
//   const inputRef = useRef<HTMLInputElement | null>(null)
//   const enableEdit = () => setEdit(true)
//   const disableEdit = () => setEdit(false)

//   const { isPending, mutate } = useMutationData(
//     ["update-automation"],
//     (data: { name: string }) => updateAutomationName(automationId, { name: data.name }),
//     "automation-info",
//     disableEdit,
//   )

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (inputRef.current && !inputRef.current.contains(event.target as Node | null)) {
//         if (inputRef.current.value !== "") {
//           mutate({ name: inputRef.current.value })
//         } else {
//           disableEdit()
//         }
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [mutate])

//   return {
//     edit,
//     enableEdit,
//     disableEdit,
//     inputRef,
//     isPending,
//   }
// }

// export const useListener = (id: string) => {
//   const [listener, setListener] = useState<"MESSAGE" | "SMARTAI" | null>(null)

//   const promptSchema = z.object({
//     prompt: z.string().min(1),
//     reply: z.string(),
//   })

//   const { isPending, mutate } = useMutationData(
//     ["create-listener"],
//     (data: { prompt: string; reply: string }) => saveListener(id, listener || "MESSAGE", data.prompt, data.reply),
//     "automation-info",
//   )

//   const { errors, onFormSubmit, register, reset, watch } = useZodForm(promptSchema, mutate)

//   const onSetListener = (type: "SMARTAI" | "MESSAGE") => setListener(type)
//   return { onSetListener, register, onFormSubmit, listener, isPending }
// }

// export const useTriggers = (id: string) => {
//   const types = useAppSelector((state) => state.AutmationReducer.trigger?.types)

//   const dispatch: AppDispatch = useDispatch()

//   const onSetTrigger = (type: "COMMENT" | "DM") => dispatch(TRIGGER({ trigger: { type } }))

//   const { isPending, mutate } = useMutationData(
//     ["add-trigger"],
//     (data: { types: string[] }) => saveTrigger(id, data.types),
//     "automation-info",
//   )

//   const onSaveTrigger = () => mutate({ types })
//   return { types, onSetTrigger, onSaveTrigger, isPending }
// }

// export const useKeywords = (id: string) => {
//   const [keyword, setKeyword] = useState("")
//   const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

//   const { mutate } = useMutationData(
//     ["add-keyword"],
//     (data: { keyword: string }) => saveKeyword(id, data.keyword),
//     "automation-info",
//     () => setKeyword(""),
//   )

//   const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       mutate({ keyword })
//       setKeyword("")
//     }
//   }

//   const { mutate: deleteMutation } = useMutationData(
//     ["delete-keyword"],
//     (data: { id: string }) => deleteKeyword(data.id),
//     "automation-info",
//   )

//   const addKeyword = (newKeyword: string) => {
//     if (newKeyword.trim()) {
//       mutate({ keyword: newKeyword })
//     }
//   }

//   return { keyword, onValueChange, onKeyPress, deleteMutation, addKeyword }
// }

// export const useAutomationPosts = (id: string) => {
//   const [posts, setPosts] = useState<
//     {
//       postid: string
//       caption?: string
//       media: string
//       mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"
//     }[]
//   >([])

//   // Add state for scheduled posts
//   const [scheduledPosts, setScheduledPosts] = useState<string[]>([])

//   const onSelectPost = (post: {
//     postid: string
//     caption?: string
//     media: string
//     mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM"
//   }) => {
//     setPosts((prevItems) => {
//       if (prevItems.find((p) => p.postid === post.postid)) {
//         return prevItems.filter((item) => item.postid !== post.postid)
//       } else {
//         return [...prevItems, post]
//       }
//     })
//   }

//   // Add function to handle scheduled post selection
//   const onSelectScheduledPost = (post: ScheduledPost) => {
//     setScheduledPosts((prevItems) => {
//       if (prevItems.includes(post.id)) {
//         return prevItems.filter((item) => item !== post.id)
//       } else {
//         return [...prevItems, post.id]
//       }
//     })
//   }

//   const { mutate, isPending } = useMutationData(
//     ["attach-posts"],
//     async (data?: { posts?: typeof posts; scheduledPostIds?: string[] }) => {
//       // Use provided posts or current state
//       const postsToSave = data?.posts || posts

//       // Use provided scheduledPostIds or current state
//       const scheduledPostIdsToSave = data?.scheduledPostIds || scheduledPosts

//       // Save published posts
//       const publishedResult = await savePosts(id, postsToSave)

//       // Save scheduled posts if there are any
//       if (scheduledPostIdsToSave.length > 0) {
//         await saveScheduledPosts(id, scheduledPostIdsToSave)
//       }

//       return publishedResult
//     },
//     "automation-info",
//     () => {
//       setPosts([])
//       setScheduledPosts([])
//     },
//   )

//   const { mutate: deleteMutation, isPending: isDeleting } = useMutationData(
//     ["delete-automation"],
//     async (data: { id: string }) => {
//       try {
//         const response = await deleteAutomation(data.id)
//         if (response.status !== 200) throw new Error("Failed to delete automation")
//         return response
//       } catch (err) {
//         console.error("Error deleting automation:", err)
//         throw err
//       }
//     },
//     "automation-info",
//   )

//   return {
//     posts,
//     onSelectPost,
//     scheduledPosts,
//     onSelectScheduledPost,
//     mutate,
//     isPending,
//     deleteMutation,
//     isDeleting,
//   }
// }


//LATEST ONE WITHOUT SCHEDULED 
// import { z } from 'zod';
// import {
//   createAutomations,
//   deleteAutomation,
//   deleteKeyword,
//   saveKeyword,
//   saveListener,
//   savePosts,
//   saveTrigger,
//   updateAutomationName,
//   saveScheduledPosts,
// } from '@/actions/automations';
// import { useMutationData } from './use-mutation-data';
// import { useRouter } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';
// import useZodForm from './use-zod-form';
// import { AppDispatch, useAppSelector } from '@/redux/store';
// import { useDispatch } from 'react-redux';
// import { TRIGGER } from '@/redux/slices/automation';

// export const useCreateAutomation = (id?: string) => {
//   const { isPending, mutate } = useMutationData(
//     ['create-automation'],
//     () => createAutomations(id),
//     'user-automations'
//   );

//   return { isPending, mutate };
// };

// export const useEditAutomation = (automationId: string) => {
//   const [edit, setEdit] = useState(false);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const enableEdit = () => setEdit(true);
//   const disableEdit = () => setEdit(false);

//   const { isPending, mutate } = useMutationData(
//     ['update-automation'],
//     (data: { name: string }) =>
//       updateAutomationName(automationId, { name: data.name }),
//     'automation-info',
//     disableEdit
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         inputRef.current &&
//         !inputRef.current.contains(event.target as Node | null)
//       ) {
//         if (inputRef.current.value !== '') {
//           mutate({ name: inputRef.current.value });
//         } else {
//           disableEdit();
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [mutate]);

//   return {
//     edit,
//     enableEdit,
//     disableEdit,
//     inputRef,
//     isPending,
//   };
// };

// export const useListener = (id: string) => {
//   const [listener, setListener] = useState<'MESSAGE' | 'SMARTAI' | null>(null);

//   const promptSchema = z.object({
//     prompt: z.string().min(1),
//     reply: z.string(),
//   });

//   const { isPending, mutate } = useMutationData(
//     ['create-listener'],
//     (data: { prompt: string; reply: string }) =>
//       saveListener(id, listener || 'MESSAGE', data.prompt, data.reply),
//     'automation-info'
//   );

//   const { errors, onFormSubmit, register, reset, watch } = useZodForm(
//     promptSchema,
//     mutate
//   );

//   const onSetListener = (type: 'SMARTAI' | 'MESSAGE') => setListener(type);
//   return { onSetListener, register, onFormSubmit, listener, isPending };
// };

// export const useTriggers = (id: string) => {
//   const types = useAppSelector((state) => state.AutmationReducer.trigger?.types);

//   const dispatch: AppDispatch = useDispatch();

//   const onSetTrigger = (type: 'COMMENT' | 'DM') =>
//     dispatch(TRIGGER({ trigger: { type } }));

//   const { isPending, mutate } = useMutationData(
//     ['add-trigger'],
//     (data: { types: string[] }) => saveTrigger(id, data.types),
//     'automation-info'
//   );

//   const onSaveTrigger = () => mutate({ types });
//   return { types, onSetTrigger, onSaveTrigger, isPending };
// };

// export const useKeywords = (id: string) => {
//   const [keyword, setKeyword] = useState('');
//   const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setKeyword(e.target.value);

//   const { mutate } = useMutationData(
//     ['add-keyword'],
//     (data: { keyword: string }) => saveKeyword(id, data.keyword),
//     'automation-info',
//     () => setKeyword('')
//   );

//   const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       mutate({ keyword });
//       setKeyword('');
//     }
//   };

//   const { mutate: deleteMutation } = useMutationData(
//     ['delete-keyword'],
//     (data: { id: string }) => deleteKeyword(data.id),
//     'automation-info'
//   );

//   const addKeyword = (newKeyword: string) => {
//     if (newKeyword.trim()) {
//       mutate({ keyword: newKeyword })
//     }
//   }

//   return { keyword, onValueChange, onKeyPress, deleteMutation, addKeyword };
// };

// export const useAutomationPosts = (id: string) => {
//   const [posts, setPosts] = useState<
//     {
//       postid: string;
//       caption?: string;
//       media: string;
//       mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM';
//     }[]
//   >([]);

//   const onSelectPost = (post: {
//     postid: string;
//     caption?: string;
//     media: string;
//     mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM';
//   }) => {
//     setPosts((prevItems) => {
//       if (prevItems.find((p) => p.postid === post.postid)) {
//         return prevItems.filter((item) => item.postid !== post.postid);
//       } else {
//         return [...prevItems, post];
//       }
//     });
//   };

//   const { mutate, isPending } = useMutationData(
//     ['attach-posts'],
//     () => savePosts(id, posts),
//     'automation-info',
//     () => setPosts([])
//   );

//   const { mutate: deleteMutation, isPending: isDeleting } = useMutationData(
//     ['delete-automation'],
//     async (data: { id: string }) => {
//       try {
//         const response = await deleteAutomation(data.id);
//         if (response.status !== 200) throw new Error('Failed to delete automation');
//         return response;
//       } catch (err) {
//         console.error('Error deleting automation:', err);
//         throw err;
//       }
//     },
//     'automation-info'
//   );

//   return { posts, onSelectPost, mutate, isPending, deleteMutation, isDeleting };
// };



//ORIGINAL CODE 


// import { z } from 'zod'
// import {
//   createAutomations,
//   deleteAutomation,
//   deleteKeyword,
//   saveKeyword,
//   saveListener,
//   savePosts,
//   saveTrigger,
//   updateAutomationName,
// } from '@/actions/automations'
// import { useMutationData } from './use-mutation-data'
// // import { useMutation } from '@/hooks/use-mutation-data' // Highlighted change
// import { useRouter } from 'next/navigation'
// import { useEffect, useRef, useState } from 'react'
// import useZodForm from './use-zod-form'
// import { AppDispatch, useAppSelector } from '@/redux/store'
// import { useDispatch } from 'react-redux'
// import { TRIGGER } from '@/redux/slices/automation'

// export const useCreateAutomation = (id?: string) => {
//   const { isPending, mutate } = useMutationData(
//     ['create-automation'],
//     () => createAutomations(id),
//     'user-automations'
//   )

//   return { isPending, mutate }
// }

// export const useEditAutomation = (automationId: string) => {
//   const [edit, setEdit] = useState(false)
//   const inputRef = useRef<HTMLInputElement | null>(null)
//   const enableEdit = () => setEdit(true)
//   const disableEdit = () => setEdit(false)

//   const { isPending, mutate } = useMutationData(
//     ['update-automation'],
//     (data: { name: string }) =>
//       updateAutomationName(automationId, { name: data.name }),
//     'automation-info',
//     disableEdit
//   )

//   useEffect(() => {
//     function handleClickOutside(this: Document, event: MouseEvent) {
//       if (
//         inputRef.current &&
//         !inputRef.current.contains(event.target as Node | null)
//       ) {
//         if (inputRef.current.value !== '') {
//           mutate({ name: inputRef.current.value })
//         } else {
//           disableEdit()
//         }
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return {
//     edit,
//     enableEdit,
//     disableEdit,
//     inputRef,
//     isPending,
//   }
// }

// export const useListener = (id: string) => {
//   const [listener, setListener] = useState<'MESSAGE' | 'SMARTAI' | null>(null)

//   const promptSchema = z.object({
//     prompt: z.string().min(1),
//     reply: z.string(),
//   })

//   const { isPending, mutate } = useMutationData(
//     ['create-lister'],
//     (data: { prompt: string; reply: string }) =>
//       saveListener(id, listener || 'MESSAGE', data.prompt, data.reply),
//     'automation-info'
//   )

//   const { errors, onFormSubmit, register, reset, watch } = useZodForm(
//     promptSchema,
//     mutate
//   )

//   const onSetListener = (type: 'SMARTAI' | 'MESSAGE') => setListener(type)
//   return { onSetListener, register, onFormSubmit, listener, isPending }
// }

// export const useTriggers = (id: string) => {
//   const types = useAppSelector((state) => state.AutmationReducer.trigger?.types)

//   const dispatch: AppDispatch = useDispatch()

//   const onSetTrigger = (type: 'COMMENT' | 'DM') =>
//     dispatch(TRIGGER({ trigger: { type } }))

//   const { isPending, mutate } = useMutationData(
//     ['add-trigger'],
//     (data: { types: string[] }) => saveTrigger(id, data.types),
//     'automation-info'
//   )

//   const onSaveTrigger = () => mutate({ types })
//   return { types, onSetTrigger, onSaveTrigger, isPending }
// }

// export const useKeywords = (id: string) => {
//   const [keyword, setKeyword] = useState('')
//   const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setKeyword(e.target.value)

//   const { mutate } = useMutationData(
//     ['add-keyword'],
//     (data: { keyword: string }) => saveKeyword(id, data.keyword),
//     'automation-info',
//     () => setKeyword('')
//   )

//   const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       mutate({ keyword })
//       setKeyword('')
//     }
//   }

//   const { mutate: deleteMutation } = useMutationData(
//     ['delete-keyword'],
//     (data: { id: string }) => deleteKeyword(data.id),
//     'automation-info'
//   )

//   return { keyword, onValueChange, onKeyPress, deleteMutation }
// }



// export const useAutomationPosts = (id: string) => {
//   const [posts, setPosts] = useState<
//     {
//       postid: string
//       caption?: string
//       media: string
//       mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
//     }[]
//   >([])

//   const onSelectPost = (post: {
//     postid: string
//     caption?: string
//     media: string
//     mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
//   }) => {
//     setPosts((prevItems) => {
//       if (prevItems.find((p) => p.postid === post.postid)) {
//         return prevItems.filter((item) => item.postid !== post.postid)
//       } else {
//         return [...prevItems, post]
//       }
//     })
//   }

//   const { mutate, isPending } = useMutationData(
//     ['attach-posts'],
//     () => savePosts(id, posts),
//     'automation-info',
//     () => setPosts([])
//   )

//   const { mutate: deleteMutation, isPending: isDeleting } = useMutationData(
//     ['delete-automation'],
//     (data: { id: string }) => deleteAutomation(data.id),
//     'automation-info'
//   )

//   return { posts, onSelectPost, mutate, isPending,deleteMutation ,isDeleting}
// }

