import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.error('Missing Twilio environment variables');
}

const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, body: string) => {
  try {
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to
    });
    
    return {
      success: true,
      sid: message.sid
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return {
      success: false,
      error
    };
  }
};