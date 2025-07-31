import mailgun from 'mailgun.js';
import formData from 'form-data';
import { NextRequest, NextResponse } from 'next/server';
import { generateCartHtml } from '@/lib/email/generateCartHtml';


 const DOMAIN = process.env.MAILGUN_DOMAIN as string;
 const API_KEY = process.env.MAILGUN_API_KEY as string;
const ADMIN_EMAI_ORDER_CONFIRM = process.env.ADMIN_EMAI_ORDER_CONFIRM as string;



export async function POST(req:NextRequest) {
  const { to, subject, items,endTotalG } = await req.json();
  const emailBody = generateCartHtml(items, endTotalG);

  try {
    const mg = new mailgun(formData);
    const client = mg.client({
      username: 'api',
      key: API_KEY, // use your API Key
      url: 'https://api.eu.mailgun.net', // if your Mailgun is in EU region
    });
     
 


   
    
       // Email to customer
    const customerMail = await client.messages.create(DOMAIN, {
      from: 'info@masala-gf.shop',
      to,
      subject,
      html: emailBody,
    });

  //   Email to business/info
     const internalMail = await client.messages.create(DOMAIN, {
      from: 'info@masala-gf.shop',
      to: ADMIN_EMAI_ORDER_CONFIRM,
      subject: `New Order Received - ${subject}`,
      html: emailBody,
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