'use server';

export async function sendQuoteRequest(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const company = formData.get('company');
  const message = formData.get('message');

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const receiverEmail = process.env.BREVO_RECEIVER_EMAIL;

  if (!apiKey || !senderEmail || !receiverEmail) {
    console.error('Missing Brevo environment variables');
    return { success: false, error: 'Server configuration error' };
  }

  const emailData = {
    sender: { name: 'Vista Envision Website', email: senderEmail },
    to: [{ email: receiverEmail }],
    subject: `New Quote Request from ${name}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background-color: #474846; color: #ffffff; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
          .content { padding: 30px 20px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; display: block; }
          .value { font-size: 16px; color: #333; }
          .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #F4D854; border-radius: 4px; }
          .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e0e0e0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Quote Request</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">From</span>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <span class="label">Email</span>
              <div class="value"><a href="mailto:${email}" style="color: #474846; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <span class="label">Company</span>
              <div class="value">${company || 'N/A'}</div>
            </div>
            <div class="field">
              <span class="label">Project Details</span>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Vista Envision website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    replyTo: { email: email, name: name }
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return { success: false, error: 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Network error' };
  }
}
