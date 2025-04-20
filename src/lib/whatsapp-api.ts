// // Production-ready WhatsApp API integration

// export async function sendWhatsAppMessage(phoneNumberId: string, accessToken: string, to: string, message: string) {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           messaging_product: "whatsapp",
//           recipient_type: "individual",
//           to,
//           type: "text",
//           text: {
//             body: message,
//           },
//         }),
//       })
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`WhatsApp API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return data
//     } catch (error) {
//       console.error("Error sending WhatsApp message:", error)
//       throw error
//     }
//   }
  
//   export async function sendWhatsAppTemplateMessage(
//     phoneNumberId: string,
//     accessToken: string,
//     to: string,
//     templateName: string,
//     languageCode = "en_US",
//     components: any[] = [],
//   ) {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           messaging_product: "whatsapp",
//           recipient_type: "individual",
//           to,
//           type: "template",
//           template: {
//             name: templateName,
//             language: {
//               code: languageCode,
//             },
//             components,
//           },
//         }),
//       })
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`WhatsApp API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return data
//     } catch (error) {
//       console.error("Error sending WhatsApp template message:", error)
//       throw error
//     }
//   }
  
//   export async function getWhatsAppBusinessAccounts(accessToken: string) {
//     try {
//       const response = await fetch(
//         `https://graph.facebook.com/v22.0/me/businesses?fields=id,name,verification_status,whatsapp_business_accounts`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       )
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return data.data || []
//     } catch (error) {
//       console.error("Error fetching WhatsApp business accounts:", error)
//       throw error
//     }
//   }
  
//   export async function getWhatsAppPhoneNumbers(accessToken: string, wabaId: string) {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v22.0/${wabaId}/phone_numbers`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return data.data || []
//     } catch (error) {
//       console.error("Error fetching WhatsApp phone numbers:", error)
//       throw error
//     }
//   }
  
//   export async function requestVerificationCode(accessToken: string, phoneNumberId: string) {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/request_code`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code_method: "SMS",
//         }),
//       })
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return data
//     } catch (error) {
//       console.error("Error requesting verification code:", error)
//       throw error
//     }
//   }
  
//   export async function verifyPhoneNumber(accessToken: string, phoneNumberId: string, code: string) {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/verify_code`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code,
//         }),
//       })
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return data
//     } catch (error) {
//       console.error("Error verifying phone number:", error)
//       throw error
//     }
//   }
  
//   export async function subscribeAppToWhatsAppBusinessAccount(accessToken: string, wabaId: string) {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v22.0/${wabaId}/subscribed_apps`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       })
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return data
//     } catch (error) {
//       console.error("Error subscribing app to WABA:", error)
//       throw error
//     }
//   }
  
//   export async function refreshAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
//     try {
//       const response = await fetch("https://graph.facebook.com/v22.0/oauth/access_token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           grant_type: "refresh_token",
//           client_id: clientId,
//           client_secret: clientSecret,
//           refresh_token: refreshToken,
//         }),
//       })
  
//       const data = await response.json()
  
//       if (!response.ok) {
//         throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
//       }
  
//       return {
//         accessToken: data.access_token,
//         expiresIn: data.expires_in,
//       }
//     } catch (error) {
//       console.error("Error refreshing access token:", error)
//       throw error
//     }
//   }
  
import type { WhatsAppBusinessAccount, WhatsAppPhoneNumber } from "@/types/whatsapp"

// Production-ready WhatsApp API integration

export async function sendWhatsAppMessage(phoneNumberId: string, accessToken: string, to: string, message: string) {
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: {
          body: message,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    throw error
  }
}

export async function sendWhatsAppTemplateMessage(
  phoneNumberId: string,
  accessToken: string,
  to: string,
  templateName: string,
  languageCode = "en_US",
  components: any[] = [],
) {
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    console.error("Error sending WhatsApp template message:", error)
    throw error
  }
}

export async function getWhatsAppBusinessAccounts(accessToken: string): Promise<WhatsAppBusinessAccount[]> {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/me/businesses?fields=id,name,verification_status,whatsapp_business_accounts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return data.data || []
  } catch (error) {
    console.error("Error fetching WhatsApp business accounts:", error)
    throw error
  }
}

export async function getWhatsAppPhoneNumbers(accessToken: string, wabaId: string): Promise<WhatsAppPhoneNumber[]> {
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${wabaId}/phone_numbers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return data.data || []
  } catch (error) {
    console.error("Error fetching WhatsApp phone numbers:", error)
    throw error
  }
}

export async function requestVerificationCode(accessToken: string, phoneNumberId: string) {
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/request_code`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code_method: "SMS",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    console.error("Error requesting verification code:", error)
    throw error
  }
}

export async function verifyPhoneNumber(accessToken: string, phoneNumberId: string, code: string) {
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/verify_code`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    console.error("Error verifying phone number:", error)
    throw error
  }
}

export async function subscribeAppToWhatsAppBusinessAccount(accessToken: string, wabaId: string) {
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${wabaId}/subscribed_apps`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    console.error("Error subscribing app to WABA:", error)
    throw error
  }
}

export async function refreshAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  try {
    const response = await fetch("https://graph.facebook.com/v17.0/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Meta API error: ${data.error?.message || JSON.stringify(data)}`)
    }

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    }
  } catch (error) {
    console.error("Error refreshing access token:", error)
    throw error
  }
}

