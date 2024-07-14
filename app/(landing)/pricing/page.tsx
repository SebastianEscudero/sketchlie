import { Card } from "@/components/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/subscriptionPlans";
import { Check, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
    title: "Precios | Sketchlie",
    description: "Los planes de Sketchlie, Gratis, Starter, Business. Comienza gratis y desbloquea todas las herramientas que necesitas para colaborar en tus proyectos.",
    keywords: ["sketchlie pricing", "sketchlie precios", "sketchlie planes", "sketchlie planes precios"],
    alternates: {
        canonical: "https://www.sketchlie.com/pricing/",
    }
};

const plans = subscriptionPlans

const PricingPage = () => {
    return (
        <div>
            <Breadcrumb className="xl:mx-[15%] lg:mx-[5%] mx-[2%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title="Home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Pricing</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col justify-center items-center mt-14 xl:mx-[15%] lg:mx-[5%] mx-[2%]">
                <div className="lg:gap-x-4 gap-x-1 gap-y-4 text-zinc-900 font-medium flex flex-col md:flex-row mb-10 mt-10 w-full">
                    {plans.map((subscriptionPlan) => (
                        <Card
                            key={subscriptionPlan.label}
                            className={`md:p-5 p-10 md:flex flex-col bg-white text-black flex-1 border border-black ${subscriptionPlan.recommended && 'border-2 border-custom-blue w-full'}`}>
                            <div className="h-[120px]">
                                <div className="gap-x-4 font-semibold text-3xl mb-2 flex">
                                    {subscriptionPlan.recommended ?
                                        <>
                                            {subscriptionPlan.label}
                                            <Badge variant="outline" className="uppercase text-sm py-1">
                                                Popular
                                            </Badge>
                                        </>
                                        : subscriptionPlan.label}
                                </div>
                                <div className="text-sm mb-auto">
                                    {subscriptionPlan.description}
                                </div>
                            </div>
                            <div className="flex font-bold text-4xl">
                                ${subscriptionPlan.price}/m
                            </div>
                            <div className="flex flex-col gap-y-2 mt-8 flex-1 mb-4">
                                <p>{subscriptionPlan.characteristicsDescription}</p>
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
                                    href='/dashboard?openProModal=true'
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
        </div>
    );
}

export default PricingPage;