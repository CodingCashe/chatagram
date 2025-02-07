export interface VoiceflowVariables {
    clientname?: string
    clientemail?: string
    clientphone?: string
    [key: string]: any // This allows for any other properties that might be present
  }
  
  export interface VoiceflowResponse {
    type: string
    payload: any
  }
  
  export interface VoiceflowResult {
    response: VoiceflowResponse[]
    variables: VoiceflowVariables
  }
  
  