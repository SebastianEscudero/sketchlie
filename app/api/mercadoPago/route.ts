import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPrice, getUsersCurrency } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        const userId = user?.id;

        if (!userId || !user) {
            return new NextResponse("Unauthorized no log in", {status: 401})
        }

        const { organization, plan, currency } = await req.json();
        const organizationId = organization.id;
        const organizationMembers = organization.users.length;
        const price = await getPrice(plan.price*organizationMembers, currency) || plan.price*organizationMembers;

        const OrganizationSubscription = await db.organizationSubscription.findUnique({
            where: {
                organizationId: organizationId
            },
            select: {
                subscriptionId: true,
                status: true
            }
        })

        if (OrganizationSubscription && OrganizationSubscription.subscriptionId && organization.subscriptionPlan === "Business") {
            const data = {
                init_point: "https://www.mercadopago.cl/subscriptions#from-section=menu"
            }
            return new NextResponse(JSON.stringify(data), {status: 200});
        }
        const response = await fetch('https://api.mercadopago.com/preapproval_plan', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MERCADO_PAGO_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "reason": `Sketchlie ${plan.label} Plan`,
                "external_reference": `${organizationId}-${plan.label}`,
                "payer_email": user.email,
                "notificacion_url": `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/`, 
                "auto_recurring": {
                    "frequency": 1,
                    "frequency_type": "months",
                    "start_date": new Date().toISOString(),
                    "transaction_amount": price,
                    "currency_id": currency,
                },
                "back_url": `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/`,
                "status": "active",
            })
        });

        const data = await response.json();
        
        return new NextResponse(JSON.stringify(data), {status: 200});

        } catch (error) {
            console.log("[MERCADOPAGO_ERROR]", error);
            return new NextResponse("Internal error", {status: 500});
        }
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);

    const subscriptionId = url.searchParams.get("subscriptionId");

    if (!subscriptionId) {
        return new NextResponse("Subscription ID is required", {status: 400});
    }

    const mercadopagoUrl = `https://api.mercadopago.com/preapproval/${subscriptionId}`;

    try {
        const response = await fetch(mercadopagoUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.MERCADO_PAGO_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        return new NextResponse(JSON.stringify(data), {status: 200});
    } catch (error) {
        // console.log('Error fetching MercadoPago subscription');
        return new NextResponse("Error fetching subscription information", {status: 500});
    }
}