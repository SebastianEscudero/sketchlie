import { subscriptionPlans as plans } from "@/lib/subscriptionPlans";

export function getMaxBoards(org: any): number {
  const plan = org.subscriptionPlan;

  const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);
  return planDetails ? (planDetails.features.Boards === "Ilimitados" ? Infinity : Number(planDetails.features.Boards)) : 0;
}

export function getMaxCapas(org: any): number {
  const plan = org.subscriptionPlan;
  
  const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);
  return planDetails ? (planDetails.features["Capas máximas"] === "Ilimitados" ? Infinity : Number(planDetails.features["Capas máximas"])) : 0;
}

export function getMaxOrganizations(user: any): number {
  let maxOrganizations = 0;
  let hasStarterPlan = false;
  let planLimit = 0;

  for (const org of user.organizations) {
    const plan = org.subscriptionPlan;
    const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);
    planLimit = planDetails ? (planDetails.features["Teams"] === "Ilimitados" ? Infinity : Number(planDetails.features["Teams"])) : 0;

    if (planDetails) {
      if (plan === 'Business') {
        return planLimit; 
      } else if (plan === 'Starter') {
        maxOrganizations = planLimit;
        hasStarterPlan = true;
      }
    }
  }

  if (hasStarterPlan) {
    return maxOrganizations; 
  }

  const gratisPlanDetails = plans.find(subscriptionPlan => subscriptionPlan.label === 'Gratis');
  return gratisPlanDetails ? (gratisPlanDetails.features["Teams"] === "Ilimitados" ? Infinity : Number(gratisPlanDetails.features["Teams"])) : 0;
}

export function getMaxImageSize(org: any): number {
  const plan = org.subscriptionPlan;

  const planDetails = plans.find(subscriptionPlan => subscriptionPlan.label === plan);
  if (planDetails) {
    const imageSizeStr = planDetails.features["Imágenes"];
    const match = imageSizeStr.match(/\d+/); 
    return match ? Number(match[0]) : 0; 
  }
  return 0;
}