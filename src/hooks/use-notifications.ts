// import { useState, useEffect } from 'react'
// import { Notification, NotificationType } from '@/types/notifications'

// const sampleNotifications: Notification[] = [
//   {
//     id: '1',
//     type: 'like',
//     user: {
//       id: 'user1',
//       username: 'Angel Mamaa',
//       avatar: 'https://i.pravatar.cc/150?img=1'
//     },
//     action: 'liked your post.',
//     read: false,
//     timestamp: '2m'
//   },
//   {
//     id: '2',
//     type: 'comment',
//     user: {
//       id: 'user2',
//       username: 'Mrs.Cashe',
//       avatar: 'https://i.pravatar.cc/150?img=2'
//     },
//     action: 'commented on your post:',
//     content: 'Great photo! 😍',
//     read: false,
//     timestamp: '1h'
//   },
//   {
//     id: '3',
//     type: 'follow',
//     user: {
//       id: 'user3',
//       username: 'Cashe King',
//       avatar: 'https://i.pravatar.cc/150?img=3'
//     },
//     action: 'started following you.',
//     read: true,
//     timestamp: '2d'
//   },
//   {
//     id: '4',
//     type: 'mention',
//     user: {
//       id: 'user4',
//       username: 'Brayo Mbiggie',
//       avatar: 'https://i.pravatar.cc/150?img=4'
//     },
//     action: 'mentioned you in a comment:',
//     content: 'Hey @Casheisking, check this out!',
//     read: false,
//     timestamp: '5h'
//   },
// ]

// export const useNotifications = () => {
//   const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)

//   const addNotification = (notification: Notification) => {
//     setNotifications(prev => [notification, ...prev])
//   }

//   const markAsRead = (id: string) => {
//     setNotifications(prev =>
//       prev.map(notif =>
//         notif.id === id ? { ...notif, read: true } : notif
//       )
//     )
//   }

//   const clearAll = () => {
//     setNotifications([])
//   }

//   // Simulating real-time notifications (replace this with actual Instagram integration)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newNotification: Notification = {
//         id: Date.now().toString(),
//         type: ['like', 'comment', 'follow', 'mention'][Math.floor(Math.random() * 4)] as NotificationType,
//         user: {
//           id: `user${Math.floor(Math.random() * 1000)}`,
//           username: `user${Math.floor(Math.random() * 1000)}`,
//           avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
//         },
//         action: `performed a ${['like', 'comment', 'follow', 'mention'][Math.floor(Math.random() * 4)]} action.`,
//         content: Math.random() > 0.5 ? 'Some optional content for comments or mentions.' : undefined,
//         read: false,
//         timestamp: 'Just now'
//       }
//       addNotification(newNotification)
//     }, 60000) // Add a new notification every 1 min

//     return () => clearInterval(interval)
//   }, [])

//   return { notifications, addNotification, markAsRead, clearAll }
// }

// import { useState, useEffect } from 'react'
// import { useQueryAutomations } from '@/hooks/user-queries'
// import { Notification } from '@/types/notifications'

// export const useNotifications = () => {
//   const { data } = useQueryAutomations()
//   const [notifications, setNotifications] = useState<Notification[]>([])

//   // Function to map Instagram data to notification format
//   const mapInstagramDataToNotifications = (data: any): Notification[] => {
//     return data?.data.map((item: any, index: number) => ({
//       id: `notif-${index}`,
//       type: item.listener?.commentCount ? 'comment' : item.listener?.dmCount ? 'dm' : 'like',
//       user: {
//         id: `user-${index}`,
//         username: item.listener?.username || 'Unknown User',
//         avatar: `https://i.pravatar.cc/150?img=${index + 1}`, // Placeholder avatar
//       },
//       action: item.listener?.commentCount
//         ? ' commented on your post.'
//         : item.listener?.dmCount
//         ? ' sent you a direct message.'
//         : ' liked your post',
//       content: item.listener?.commentCount
//         ? item.listener?.lastComment
//         : item.listener?.dmCount
//         ? item.listener?.lastDm
//         : undefined,
//       read: false,
//       timestamp: new Date(item.timestamp || Date.now()).toLocaleTimeString(),
//     })) || []
//   }

//   // Update notifications whenever Instagram data changes
//   useEffect(() => {
//     if (data) {
//       const newNotifications = mapInstagramDataToNotifications(data)
//       setNotifications(newNotifications)
//     }
//   }, [data])

//   const addNotification = (notification: Notification) => {
//     setNotifications((prev) => [notification, ...prev])
//   }

//   const markAsRead = (id: string) => {
//     setNotifications((prev) =>
//       prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
//     )
//   }

//   const clearAll = () => {
//     setNotifications([])
//   }

//   return { notifications, addNotification, markAsRead, clearAll }
// }


// import { useState, useEffect } from 'react'
// import { useQueryAutomations } from '@/hooks/user-queries'
// import { Notification } from '@/types/notifications'

// export const useNotifications = () => {
//   const { data } = useQueryAutomations()
//   const [notifications, setNotifications] = useState<Notification[]>([])

//   // Function to map Instagram data to notification format
//   const mapInstagramDataToNotifications = (data: any): Notification[] => {
//     return data?.data.map((item: any, index: number) => ({
//       id: `notif-${index}`,
//       type: item.listener?.commentCount ? 'comment' : item.listener?.dmCount ? 'dm' : 'like',
//       user: {
//         id: `user-${index}`,
//         username: item.listener?.username || 'Unknown User',
//         avatar: `https://i.pravatar.cc/150?img=${index + 1}`, // Placeholder avatar
//       },
//       action: item.listener?.commentCount
//         ? ' commented on your post.'
//         : item.listener?.dmCount
//         ? ' sent you a direct message.'
//         : ' liked your post',
//       content: item.listener?.commentCount
//         ? item.listener?.lastComment
//         : item.listener?.dmCount
//         ? item.listener?.lastDm
//         : undefined,
//       read: false,
//       timestamp: new Date(item.timestamp || Date.now()).toLocaleTimeString(),
//     })) || []
//   }

//   // Update notifications whenever Instagram data changes
//   useEffect(() => {
//     if (data) {
//       // Log the data to see its structure
//       console.log('Received data from useQueryAutomations:', data)

//       const newNotifications = mapInstagramDataToNotifications(data)
//       setNotifications(newNotifications)
//     }
//   }, [data])

//   const addNotification = (notification: Notification) => {
//     setNotifications((prev) => [notification, ...prev])
//   }

//   const markAsRead = (id: string) => {
//     setNotifications((prev) =>
//       prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
//     )
//   }

//   const clearAll = () => {
//     setNotifications([])
//   }

//   return { notifications, addNotification, markAsRead, clearAll }
// }


// import { useState, useEffect } from 'react'
// import { useQueryAutomations } from '@/hooks/user-queries'
// import { Notification } from '@/types/notifications'

// export const useNotifications = () => {
//   const { data } = useQueryAutomations()
//   const [notifications, setNotifications] = useState<Notification[]>([])

//   // Function to map Instagram data to notification format
//   const mapInstagramDataToNotifications = (data: any): Notification[] => {
//     return data?.data.map((item: any, index: number) => ({
//       id: `notif-${index}`,
//       type: item.listener?.commentCount ? 'comment' : item.listener?.dmCount ? 'dm' : 'like',
//       user: {
//         id: `user-${index}`,
//         username: item.listener?.username || '@Cashe',
//         avatar: `https://i.pravatar.cc/150?img=${index + 1}`, // Placeholder avatar
//       },
//       // Construct the action based on comment or dm
//       action: item.listener?.commentCount
//         ? `${item.listener?.username} New comment on your post`
//         : item.listener?.dmCount
//         ? `${item.listener?.username} sent you a direct message`
//         : `${item.listener?.username} liked your post`,
//       content: item.listener?.commentCount
//         ? item.listener?.lastComment // Showing the actual comment
//         : item.listener?.dmCount
//         ? item.listener?.lastDm // Showing the actual DM
//         : undefined,
//       read: false,
//       timestamp: new Date(item.timestamp || Date.now()).toLocaleTimeString(),
//     })) || []
//   }

//   // Update notifications whenever Instagram data changes
//   useEffect(() => {
//     if (data) {
//       // Log the data to see its structure
//       console.log('Received data from useQueryAutomations:', data)

//       const newNotifications = mapInstagramDataToNotifications(data)
//       setNotifications(newNotifications)
//     }
//   }, [data])

//   const addNotification = (notification: Notification) => {
//     setNotifications((prev) => [notification, ...prev])
//   }

//   const markAsRead = (id: string) => {
//     setNotifications((prev) =>
//       prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
//     )
//   }

//   const clearAll = () => {
//     setNotifications([])
//   }

//   return { notifications, addNotification, markAsRead, clearAll }
// }


import { useState, useEffect } from 'react'
import { useQueryAutomations } from '@/hooks/user-queries'
import { Notification } from '@/types/notifications'

export const useNotifications = () => {
  const { data } = useQueryAutomations()
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Function to map Instagram data to notification format
  const mapInstagramDataToNotifications = (data: any): Notification[] => {
    return (
      data?.data.map((item: any, index: number) => {
        const keywordMessages = item.keywords.map(
          (keyword: any) =>
            `You've received new messages for the keyword "${keyword.word}" in this automation.`
        )

        return {
          id: `notif-${index}`,
          type: 'engagement',
          user: {
            id: item.userId || `user-${index}`,
            username: item.name,
            avatar: `https://i.pravatar.cc/150?img=${index + 1}`, // Placeholder avatar
          },
          action: `New engagements detected`,
          content: keywordMessages.join(' '),
          read: false,
          timestamp: new Date(item.createdAt).toLocaleString(),
        }
      }) || []
    )
  }

  // Update notifications whenever Instagram data changes
  useEffect(() => {
    if (data) {
      // Log the data to understand its structure
      // console.log('Received data from useQueryAutomations:', data)

      const newNotifications = mapInstagramDataToNotifications(data)
      setNotifications(newNotifications)
    }
  }, [data])

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return { notifications, addNotification, markAsRead, clearAll }
}


// import { useState, useEffect } from 'react';
// import { useQueryAutomations } from '@/hooks/user-queries';
// import { Notification } from '@/types/notifications';

// // Fetch Instagram user details
// const fetchInstagramUserDetails = async (userId, accessToken) => {

//   try {
//     const response = await fetch(
//       `https://graph.instagram.com/${userId}?fields=id,username,profile_picture_url&access_token=${accessToken}`
//     );
//     const data = await response.json();
//     return {
//       username: data.username || '@Unknown',
//       avatar: data.profile_picture_url || 'https://i.pravatar.cc/150?img=placeholder',
//     };
//   } catch (error) {
//     console.error('Error fetching Instagram user details:', error);
//     return { username: '@Unknown', avatar: 'https://i.pravatar.cc/150?img=placeholder' };
//   }
// };

// export const useNotifications = () => {
//   const { data } = useQueryAutomations();
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [accessToken, setAccessToken] = useState('YOUR_ACCESS_TOKEN'); // Replace with your Instagram access token

//   // Function to map Instagram data to notification format
//   const mapInstagramDataToNotifications = async (data: any): Promise<Notification[]> => {
//     return Promise.all(
//       data?.data.map(async (item: any, index: number) => {
//         const userDetails = await fetchInstagramUserDetails(item.userId, accessToken);

//         const keywordMessages = item.keywords.map(
//           (keyword: any) =>
//             `You've received new messages for the keyword "${keyword.word}" in automation "${item.name}".`
//         );

//         return {
//           id: `notif-${index}`,
//           type: 'engagement',
//           user: {
//             id: item.userId || `user-${index}`,
//             username: userDetails.username,
//             avatar: userDetails.avatar,
//           },
//           action: `New engagements detected in automation "${item.name}"`,
//           content: keywordMessages.join(' '),
//           read: false,
//           timestamp: new Date(item.createdAt).toLocaleString(),
//         };
//       }) || []
//     );
//   };

//   // Update notifications whenever Instagram data changes
//   useEffect(() => {
//     const updateNotifications = async () => {
//       if (data) {
//         console.log('Received data from useQueryAutomations:', data);
//         const newNotifications = await mapInstagramDataToNotifications(data);
//         setNotifications(newNotifications);
//       }
//     };

//     updateNotifications();
//   }, [data, accessToken]);

//   const addNotification = (notification: Notification) => {
//     setNotifications((prev) => [notification, ...prev]);
//   };

//   const markAsRead = (id: string) => {
//     setNotifications((prev) =>
//       prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
//     );
//   };

//   const clearAll = () => {
//     setNotifications([]);
//   };

//   return { notifications, addNotification, markAsRead, clearAll };
// };
