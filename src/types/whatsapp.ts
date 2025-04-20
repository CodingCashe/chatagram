// export interface WhatsAppBusinessAccount {
//     id: string
//     name: string
//     // Add other properties as needed
//   }
  
//   export interface WhatsAppPhoneNumber {
//     id: string
//     display_phone_number: string
//     // Add other properties as needed
//   }
  
export interface WhatsAppBusinessAccount {
  id: string
  name: string
  verification_status?: string
}

export interface WhatsAppPhoneNumber {
  id: string
  display_phone_number: string
  verified_name?: string
}

