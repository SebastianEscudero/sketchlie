const DAY_IN_MS = 86_400_000;
export const checkSubscription = (activeOrg: any) => {
    const organizationId = activeOrg.id;

    if (!organizationId) {
        return false;
    }

    const orgSubscription = activeOrg.subscription;

    if (!orgSubscription) {
        return false;
    }

    const isValid = 
        orgSubscription.subscriptionId &&
        new Date(orgSubscription.mercadoPagoCurrentPeriodEnd!).getTime() + DAY_IN_MS > Date.now();

    return !!isValid;
};