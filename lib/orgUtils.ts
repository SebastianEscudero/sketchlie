import { SubscriptionType } from "@prisma/client";

interface PlanColors {
    color: string;
    letterColor: string;
}

export function getPlanColor(plan: SubscriptionType | undefined): PlanColors {
    if (!plan) {
        return { color: '#d4d4d8', letterColor: '#000000' };
    }

    switch (plan) {
        case 'Gratis':
            return { color: '#d4d4d8', letterColor: '#000000' };
        case 'Starter':
            return { color: '#F59E0B', letterColor: '#000000' };
        case 'Business':
            return { color: '#2631c3', letterColor: '#FFFFFF' };
        default:
            return { color: '#6C47FF', letterColor: '#FFFFFF' };
    }
}