import { Card } from "@/components/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/subscriptionPlans";
import { Check, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Precios | Sketchlie",
    description: "Los planes de Sketchlie, Gratis, Starter, Business. Comienza gratis y desbloquea todas las herramientas que necesitas para colaborar en tus proyectos.",
    keywords: ["sketchlie pricing", "sketchlie precios", "sketchlie planes", "sketchlie planes precios"],
    alternates: {
        canonical: "https://www.sketchlie.com/pricing",
    }
};

const plans = subscriptionPlans

const PricingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-14">
            <h1>
                <Badge className="uppercase text-xl py-1" variant="inProgress">
                    Pronto estará disponible
                </Badge>
                <div className="flex items-center text-xl gap-x-2 font-bold py-1 justify-center mt-2">
                    Sketchlie
                    <Badge className="uppercase text-sm py-1" variant="outline">
                        Pro
                    </Badge>
                </div>
            </h1>
            <div className="lg:gap-4 gap-x-2 gap-y-4 text-zinc-900 font-medium flex flex-col md:flex-row lg:mx-[5%] mx-[3%] mb-10 mt-14">
                {plans.map((subscriptionPlan) => (
                    <Card
                        key={subscriptionPlan.label}
                        className={`md:p-5 p-10 md:flex flex-col flex-1 border border-black ${subscriptionPlan.recommended && 'border-2 border-custom-blue'}`}>
                        <div className="h-[120px]">
                            <div className="gap-x-4 font-semibold text-xl mb-2 flex">
                                {subscriptionPlan.recommended ?
                                    <>
                                        {subscriptionPlan.label}
                                        <Badge variant="outline" className="uppercase text-sm py-1">
                                            Popular
                                        </Badge>
                                    </>
                                    : subscriptionPlan.label}
                            </div>
                            <div className="font-normal text-sm mb-auto">
                                {subscriptionPlan.description}
                            </div>
                        </div>
                        <div className="flex font-bold text-3xl">
                            {subscriptionPlan.price}$/m
                        </div>
                        <div className="flex flex-col gap-y-2 mt-8 flex-1 mb-4">
                            <p>Todas las características del plan gratis más:</p>
                            {Object.entries(subscriptionPlan.features).map(([feature, value]) => (
                                <div key={feature} className="flex items-center gap-x-2">
                                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span className="text-black-5">{feature}:</span>
                                    <span className="text-black-5 font-bold">{value}</span>
                                </div>
                            ))}
                            {subscriptionPlan.extraFeatures && (
                                <div className="flex items-center gap-x-2">
                                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span className="text-black-5 font-bold">{subscriptionPlan.extraFeatures}</span>
                                </div>
                            )}
                        </div>
                        {subscriptionPlan.label === "Gratis" ? (
                            <Link
                                href='/auth/register'
                                className='w-full'
                            >
                                <Button variant="outline" className="w-full text-lg">
                                    Comienza gratis
                                </Button>
                            </Link>
                        ) : (
                            <Link
                                href='/dashboard'
                                className='w-full'
                            >
                                <Button variant="auth" className="w-full text-lg">
                                    Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
                                </Button>
                            </Link>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default PricingPage;