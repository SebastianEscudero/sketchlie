const DAY_IN_MS = 86_400_000;
export const checkSubscription = (user: any) => {

    const userId = user?.id
    
    if (!userId) {
        return false;
    }

    const userSubscription = user.subscriptions


    if (!userSubscription) {
        return false;
    }

    const isValid = 
        userSubscription.subscriptionId &&
        userSubscription.mercadoPagoCurrentPeriodEnd!.getTime() + DAY_IN_MS > Date.now();

    return !!isValid;
};