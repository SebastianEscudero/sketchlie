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