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

    const [organizationId, planLabel] = payment.response.external_reference.split('-');
    const subscriptionId = payment?.response?.id.toString(); // Ensure it's a string
    const payerId = payment?.response?.payer.id.toString(); // Ensure it's a string
    const status = payment?.response?.status; // This is already a string, so no change needed

    if (!subscriptionId) {
        return new NextResponse(`Subscription Id is required`, { status: 400 })
    }

    if (!payerId) {
        return new NextResponse(`Payer Id is required`, { status: 400 })
    }

    if (!status) {
        return new NextResponse(`Status is required`, { status: 400 })
    }

    const startDate = new Date(
        payment.response.date_approved
    );

    const endDate = addMonths(startDate, 1);

    const OrganizationSubscription = await db.organizationSubscription.findFirst({ // find if the organization already has a subscription
        where: { organizationId: organizationId }
    });

    // Check if status is approved before updating the organization with subscriptionPlan
    if (status === "approved") {
        await db.organization.update({ // if they have it or not we update the org with a new subscription plan
            where: {
                id: organizationId
            },
            data: {
                subscriptionPlan: planLabel,
            }
        });
    }

    if (OrganizationSubscription) { // if the org subscription exists we update it
        await db.organizationSubscription.update({
            where: {
                organizationId: organizationId
            },
            data: {
                subscriptionId: subscriptionId,
                mercadoPagoCurrentPeriodEnd: endDate,
            }
        });
    } else { // if not then we create a new one
        await db.organizationSubscription.create({
            data: {
                subscriptionId: subscriptionId,
                payerId: payerId,
                status: status,
                mercadoPagoCurrentPeriodEnd: endDate,
                organizationId: organizationId,
            }
        });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
}