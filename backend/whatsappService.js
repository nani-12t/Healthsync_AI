/**
 * Sends a WhatsApp OTP to the user.
 * Falls back to console logging if Meta WhatsApp Cloud API credentials are not configured.
 * @param {string} phone - Destination phone number (e.g. "+91 80742 35640")
 * @param {string} otp - The 6-digit OTP code
 */
export async function sendOTPWhatsApp(phone, otp) {
  // Normalize phone number to digits only (e.g. "918074235640")
  let normalizedPhone = phone.replace(/\D/g, '');
  
  // If it's a standard 10-digit number without country code, prepend India's country code (+91)
  if (normalizedPhone.length === 10) {
    normalizedPhone = '91' + normalizedPhone;
  }

  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || 'verification_code';

  if (token && phoneId) {
    try {
      const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
      
      const payload = {
        messaging_product: 'whatsapp',
        to: normalizedPhone,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: otp
                }
              ]
            }
          ]
        }
      };

      console.log(`[WHATSAPP] Sending API request to Meta for number: +${normalizedPhone}...`);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(`[WHATSAPP] Meta WhatsApp API sent successfully. Message ID:`, responseData.messages?.[0]?.id);
        return;
      } else {
        console.error(`[WHATSAPP] Meta API error response:`, responseData.error || responseData);
      }
    } catch (apiError) {
      console.error(`[WHATSAPP] Connection error attempting to contact Meta API:`, apiError);
    }
  }

  // Fallback console logging for local testing
  console.log('\n========================================================================');
  console.log(`[WHATSAPP BYPASS] WhatsApp OTP for +${normalizedPhone} is: ${otp}`);
  console.log('========================================================================\n');
}
