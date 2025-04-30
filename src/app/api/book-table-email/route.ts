import mailgun from 'mailgun.js';
import formData from 'form-data';
import { NextRequest, NextResponse } from 'next/server';

const DOMAIN = process.env.MAILGUN_DOMAIN as string;
 const API_KEY = process.env.MAILGUN_API_KEY as string;

 export async function POST(req:NextRequest) {
 const { to, subject, text } = await req.json();
 
  try {
    const mg = new mailgun(formData);
    const client = mg.client({
      username: 'api',
      key: API_KEY, // use your API Key
      url: 'https://api.eu.mailgun.net', // if your Mailgun is in EU region
    });
     
    // const mailData = {
    //   from: 'info@masala-gf.shop', // Change to your real domain email
    //   to,
    //   subject,
    //   html: text,
    // };

    // const result = await client.messages.create(DOMAIN, mailData);



 // Email to customer
 const customerMail = await client.messages.create(DOMAIN, {
  from: 'info@masala-gf.shop',
  to,
  subject,
  html: text,
});

 // Email to business/info
 const internalMail = await client.messages.create(DOMAIN, {
  from: 'info@masala-gf.shop',
  to: 'info@masala-gf.de',
  subject: `New Order Received - ${subject}`,
  html: text,
});


    return NextResponse.json({ message: 'Email sent successfully', customerMail });

  } catch (error) {
    console.error('Mailgun error:', error);
     return NextResponse.json(
      { error: 'Failed to send email', details: error },
        // { error: 'Failed to send email', details: error.message },
       { status: 500 }
     );
  }

    
}

// Handle non-POST requests automatically by Next.js