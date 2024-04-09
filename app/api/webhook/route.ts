import * as mercadopago from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';
import { addMonths } from 'date-fns';
import { db } from '@/lib/db';

mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_API_KEY_TEST!
});

export async function POST(request: NextRequest) {
    const body = await request.json().then((data) => data as { data: { id: string } })

    // Store body data in a variable
    const bodyData = body.data;
    try {
        const paymentId = Number(bodyData.id);
        var payment = await mercadopago.payment.get(paymentId);
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
    }

    if (payment.response.status !== 'approved' && payment.response.status_detail !== "accredited") {
        return new NextResponse(`Webhook error: ${payment.response.status_detail}`, { status: 400 })
    }

    if (payment.response.external_reference === undefined) {
        return new NextResponse(`User Id is required`, { status: 400 })
    }

    console.log(payment.response.date_approved)

    const startDate = new Date(
        payment.response.date_approved
    );

    const endDate = addMonths(startDate, 1); // one month from the current date

    const OrganizationSubscription = await db.organizationSubscription.findFirst({
        where: { organizationId: payment?.response?.external_reference }
    });


    if (OrganizationSubscription) {
        await db.organizationSubscription.update({
            where: {
                organizationId: payment?.response?.external_reference
            },
            data: {
                subscriptionId: payment?.response?.payer.id,
                mercadoPagoCurrentPeriodEnd: endDate,
            }
        })
    } else {
        await db.organizationSubscription.create({
            data: {
                organizationId: payment?.response?.external_reference,
                subscriptionId: payment?.response?.payer.id,
                mercadoPagoCurrentPeriodEnd: endDate,
            }
        })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
}