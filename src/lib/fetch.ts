import axios from 'axios'

export const refreshToken = async (token: string) => {
  const refresh_token = await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  )

  return refresh_token.data
}

// export const sendDM = async (
//   userId: string,
//   recieverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending message....')
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
//     {
//       recipient: {
//         id: recieverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// export const sendDM = async (
//   userId: string,
//   recieverId: string,
//   prompt: string,
//   token: string,
//   buttons?: { name: string; payload: string }[] // Add buttons as an optional parameter
// ) => {
//   console.log('sending message....')

//   // Construct the message payload
//   const messagePayload: any = {
//     recipient: {
//       id: recieverId,
//     },
//     message: {
//       text: prompt,
//     },
//   }

//   // Add quick replies if buttons are provided
//   if (buttons && buttons.length > 0) {
//     messagePayload.message.quick_replies = buttons.map((button) => ({
//       content_type: 'text',
//       title: button.name,
//       payload: button.payload,
//     }))
//   }

//   // Send the request to Instagram's API
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
//     messagePayload,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string,
  buttons?: { name: string; payload: string }[]
) => {
  const messagePayload: any = {
    recipient: {
      id: recieverId,
    },
    message: {
      text: prompt,
    },
  };

  if (buttons && buttons.length > 0) {
    messagePayload.message.quick_replies = buttons.map((button) => ({
      content_type: "text",
      title: button.name,
      payload: button.payload,
    }));
  }

  console.log("Sending payload to Instagram:", JSON.stringify(messagePayload, null, 2)); // Log payload

  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    messagePayload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// export const sendPrivateMessage = async (
//   userId: string,
//   recieverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending message')
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
//     {
//       recipient: {
//         comment_id: recieverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string,
  buttons?: { name: string; payload: string }[] // Add buttons as an optional parameter
) => {
  console.log('sending message')

  // Construct the message payload
  const messagePayload: any = {
    recipient: {
      comment_id: recieverId,
    },
    message: {
      text: prompt,
    },
  }

  // Add quick replies if buttons are provided
  if (buttons && buttons.length > 0) {
    messagePayload.message.quick_replies = buttons.map((button) => ({
      content_type: 'text',
      title: button.name,
      payload: button.payload,
    }))
  }

  // Send the request to Instagram's API
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    messagePayload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
}


export const generateTokens = async (code: string) => {
  const insta_form = new FormData()
  insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)

  insta_form.append(
    'client_secret',
    process.env.INSTAGRAM_CLIENT_SECRET as string
  )
  insta_form.append('grant_type', 'authorization_code')
  insta_form.append(
    'redirect_uri',
    `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
  )
  insta_form.append('code', code)

  const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
    method: 'POST',
    body: insta_form,
  })

  const token = await shortTokenRes.json()
  if (token.permissions.length > 0) {
    console.log(token, 'got permissions')
    const long_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
    )

    return long_token.data
  }
}


// import axios from 'axios'

// export const refreshToken = async (token: string) => {
//   const refresh_token = await axios.get(
//     `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
//   )

//   return refresh_token.data
// }

// export const sendDM = async (
//   userId: string,
//   recieverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending message....')
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
//     {
//       recipient: {
//         id: recieverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// export const sendPrivateMessage = async (
//   userId: string,
//   recieverId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending message')
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
//     {
//       recipient: {
//         comment_id: recieverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// // New function for WhatsApp messages
// export const sendWhatsAppMessage = async (
//   phoneNumberId: string,
//   recipientNumber: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending WhatsApp message....')
//   return await axios.post(
//     `${process.env.WHATSAPP_BASE_URL || 'https://graph.facebook.com/v17.0'}/${phoneNumberId}/messages`,
//     {
//       messaging_product: "whatsapp",
//       recipient_type: "individual",
//       to: recipientNumber,
//       type: "text",
//       text: {
//         preview_url: false,
//         body: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// // New function for Facebook Messenger messages
// export const sendFacebookMessage = async (
//   pageId: string,
//   recipientId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending Facebook message....')
//   return await axios.post(
//     `${process.env.FACEBOOK_BASE_URL || 'https://graph.facebook.com/v17.0'}/${pageId}/messages`,
//     {
//       recipient: {
//         id: recipientId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// // New function for Facebook comments
// export const sendFacebookComment = async (
//   postId: string,
//   commentId: string,
//   prompt: string,
//   token: string
// ) => {
//   console.log('sending Facebook comment....')
//   // For replying to a comment
//   const endpoint = commentId 
//     ? `${process.env.FACEBOOK_BASE_URL || 'https://graph.facebook.com/v17.0'}/${commentId}/comments` 
//     : `${process.env.FACEBOOK_BASE_URL || 'https://graph.facebook.com/v17.0'}/${postId}/comments`;
  
//   return await axios.post(
//     endpoint,
//     {
//       message: prompt,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
// }

// export const generateTokens = async (code: string) => {
//   const insta_form = new FormData()
//   insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)

//   insta_form.append(
//     'client_secret',
//     process.env.INSTAGRAM_CLIENT_SECRET as string
//   )
//   insta_form.append('grant_type', 'authorization_code')
//   insta_form.append(
//     'redirect_uri',
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
//   )
//   insta_form.append('code', code)

//   const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//     method: 'POST',
//     body: insta_form,
//   })

//   const token = await shortTokenRes.json()
//   if (token.permissions.length > 0) {
//     console.log(token, 'got permissions')
//     const long_token = await axios.get(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
//     )

//     return long_token.data
//   }
// }

// // New function for generating WhatsApp tokens
// export const generateWhatsAppTokens = async (code: string) => {
//   const whatsapp_form = new FormData()
//   whatsapp_form.append('client_id', process.env.WHATSAPP_CLIENT_ID as string)
//   whatsapp_form.append(
//     'client_secret',
//     process.env.WHATSAPP_CLIENT_SECRET as string
//   )
//   whatsapp_form.append('grant_type', 'authorization_code')
//   whatsapp_form.append(
//     'redirect_uri',
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/whatsapp`
//   )
//   whatsapp_form.append('code', code)

//   const tokenRes = await fetch(process.env.WHATSAPP_TOKEN_URL || process.env.FACEBOOK_TOKEN_URL as string, {
//     method: 'POST',
//     body: whatsapp_form,
//   })

//   return await tokenRes.json()
// }

// // New function for generating Facebook tokens
// export const generateFacebookTokens = async (code: string) => {
//   const facebook_form = new FormData()
//   facebook_form.append('client_id', process.env.FACEBOOK_CLIENT_ID as string)
//   facebook_form.append(
//     'client_secret',
//     process.env.FACEBOOK_CLIENT_SECRET as string
//   )
//   facebook_form.append('grant_type', 'authorization_code')
//   facebook_form.append(
//     'redirect_uri',
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/facebook`
//   )
//   facebook_form.append('code', code)

//   const tokenRes = await fetch(process.env.FACEBOOK_TOKEN_URL as string, {
//     method: 'POST',
//     body: facebook_form,
//   })

//   return await tokenRes.json()
// }