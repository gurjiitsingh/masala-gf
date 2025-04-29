'use client'
import React from 'react'

const sendOrderConfirmation = async () => {
   
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'gagurjiitsingh@gmail.com',
        subject: 'Order Confirmation static',
        text: 'Simple message',
      }),
    });
  
    const result = await response.json();
    console.log(result.message);
  };

export default function Page() {
  return (
  <button onClick={sendOrderConfirmation}>Send mail</button>
  )
}
