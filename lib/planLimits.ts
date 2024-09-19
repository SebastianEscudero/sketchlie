import { subscriptionPlans as plans } from "@/lib/subscriptionPlans";

export function getMaxBoards(org: any): number {
  const plan = org.subscriptionPlan;

  const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);

  if (org.subscription) {
    if (new Date(org.subscription.mercadoPagoCurrentPeriodEnd).getTime() < new Date().getTime()) {
      return 1;
    }
  }

  if (planDetails && planDetails.features) {
    return planDetails.features.Boards === "Unlimited" ? Infinity : Number(planDetails.features.Boards);
  }
  return 0;
};

export function getMaxLayers(org: any): number {
  const plan = org.subscriptionPlan;

  const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);
  if (planDetails && planDetails.features) {
    return planDetails.features["Maximum layers"] === "Unlimited" ? Infinity : Number(planDetails.features["Maximum layers"]);
  }
  return 0;
}

export function getMaxOrganizations(user: any): number {
  let maxOrganizations = 1;
  for (const org of user.organizations) {
    const plan = org.subscriptionPlan;
    const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);
    let planLimit = 1
    if (org.subscription) {
      if (new Date(org.subscription.mercadoPagoCurrentPeriodEnd).getTime() > new Date().getTime()) {
        if (planDetails && planDetails.features) {
          planLimit = planDetails.features["Teams"] === "Unlimited" ? Infinity : Number(planDetails.features["Teams"]);
        }
      }
    }
    maxOrganizations = Math.max(maxOrganizations, planLimit);
  }
  return maxOrganizations;
}

export function getMaxImageSize(org: any): number {
  const plan = org.subscriptionPlan;

  const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);
  if (planDetails && planDetails.features) {
    const imageSizeStr = planDetails.features["Images"];
    const match = imageSizeStr.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }
  return 0;
}