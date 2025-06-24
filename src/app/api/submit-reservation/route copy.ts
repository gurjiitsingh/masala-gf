import { NextRequest, NextResponse } from 'next/server';
import { sendReservationConfirmationEmail } from '@/lib/email/sendReservationConfirmationEmail';
import { reservationSchema } from '../../../../types/ReservationFormData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const result = await sendReservationConfirmationEmail(parsed.data);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      return NextResponse.json({ success: false, error: result.message || 'Email failed to send' }, { status: 500 });
    }
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}