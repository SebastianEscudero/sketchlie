import { Card } from "@/components/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/subscriptionPlans";
import { Check, Zap, X, Infinity } from "lucide-react";
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
    // Create a list of all unique features across all plans
    const allFeatures = Array.from(new Set(plans.flatMap(plan => Object.keys(plan.features || {}))))

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <Breadcrumb className="xl:mx-[15%] lg:mx-[5%] mx-[2%] pt-5">
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
            <div className="flex flex-col justify-center items-center py-16 xl:mx-[15%] lg:mx-[5%] mx-[2%]">
                <h1 className="text-4xl font-bold text-center mb-4">Elige tu plan</h1>
                <p className="text-xl text-gray-600 text-center mb-12">Comienza gratis y mejora tu plan a medida que creces</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    {plans.map((subscriptionPlan) => (
                        <Card
                            key={subscriptionPlan.label}
                            className={`p-6 flex flex-col h-full bg-white dark:bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
                                subscriptionPlan.label === "Enterprise" 
                                    ? 'border-2 border-purple-500 scale-100 dark:border-purple-500' 
                                    : subscriptionPlan.recommended 
                                    ? 'border-2 border-blue-500 scale-105 dark:border-blue-500' 
                                    : 'border border-gray-200 dark:border-gray-200'
                            }`}
                        >
                            <div className="flex flex-col h-full">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">{subscriptionPlan.label}</h2>
                                    {subscriptionPlan.recommended && (
                                        <Badge variant="sketchlieBlue" className="mt-2">
                                            Popular
                                        </Badge>
                                    )}
                                    {subscriptionPlan.label === "Enterprise" && (
                                        <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-800">
                                            Most Powerful
                                        </Badge>
                                    )}
                                    <p className="text-sm text-gray-600 mt-2">{subscriptionPlan.description}</p>
                                </div>
                                {subscriptionPlan.price !== undefined && (
                                    <div className="text-3xl font-bold text-gray-900 mb-4">
                                        ${subscriptionPlan.price}<span className="text-lg font-normal text-gray-600">/month</span>
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-gray-700 mb-3">{subscriptionPlan.characteristicsDescription}</p>
                                    {subscriptionPlan.label === "Enterprise" ? (
                                        <>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Infinity className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">Todo lo que necesites</span>
                                            </div>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">Todas las herramientas de IA</span>
                                            </div>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">Soporte de clase mundial</span>
                                            </div>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">Protección de datos</span>
                                            </div>
                                        </>
                                    ) : (
                                        subscriptionPlan.features && Object.entries(subscriptionPlan.features).map(([feature, value]) => (
                                            <div key={feature} className="flex items-center gap-x-3 text-sm mb-2">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-600">{feature}:</span>
                                                <span className="font-semibold text-gray-800">{value}</span>
                                            </div>
                                        ))
                                    )}
                                    {subscriptionPlan.extraFeatures && (
                                        <div className="flex items-center gap-x-3 text-sm mb-2">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="font-semibold text-gray-800">{subscriptionPlan.extraFeatures}</span>
                                        </div>
                                    )}
                                </div>
                                {subscriptionPlan.label === "Gratis" ? (
                                    <Link href='/auth/register' className='w-full mt-6'>
                                        <Button variant="outline" className="w-full text-lg dark:text-black">
                                            Comienza gratis
                                        </Button>
                                    </Link>
                                ) : subscriptionPlan.label === "Enterprise" ? (
                                    <Link href='/contact' className='w-full mt-6'>
                                        <Button variant="default" className="w-full text-lg bg-purple-600 text-white hover:bg-purple-700">
                                            Contáctanos
                                        </Button>
                                    </Link>
                                ) : subscriptionPlan.label === "Starter" ? (
                                    <Link href='/dashboard?openProModal=true' className='w-full mt-6'>
                                        <Button variant="outline" className="w-full text-lg border-blue-600 text-blue-600 hover:bg-blue-50">
                                            Comprar Starter
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href='/dashboard?openProModal=true' className='w-full mt-6'>
                                        <Button variant="default" className="w-full text-lg bg-blue-600 text-white hover:bg-blue-700">
                                            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Comparison Matrix */}
                <div className="mt-20 w-full overflow-x-auto text-black">
                    <h2 className="text-3xl font-bold text-center mb-8">Plan Comparison</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 text-left font-semibold">Feature</th>
                                {plans.map(plan => (
                                    <th key={plan.label} className="p-4 text-center font-semibold">{plan.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allFeatures.map((feature, index) => (
                                <tr key={feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-4 font-medium">{feature}</td>
                                    {plans.map((plan: any) => (
                                        <td key={`${plan.label}-${feature}`} className="p-4 text-center">
                                            {plan.label === "Enterprise" ? (
                                                <Infinity className="w-6 h-6 text-purple-500 mx-auto" />
                                            ) : plan.features && plan.features[feature] ? (
                                                typeof plan.features[feature] === 'boolean' ? (
                                                    plan.features[feature] ? (
                                                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                                                    ) : (
                                                        <X className="w-6 h-6 text-red-500 mx-auto" />
                                                    )
                                                ) : (
                                                    plan.features[feature]
                                                )
                                            ) : (
                                                <X className="w-6 h-6 text-red-500 mx-auto" />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {/* Extra features row */}
                            <tr className={allFeatures.length % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-4 font-medium">Extra Features</td>
                                {plans.map(plan => (
                                    <td key={`${plan.label}-extra`} className="p-4 text-center">
                                        {plan.label === "Enterprise" ? "Todas las herramientas de IA" : (plan.extraFeatures || '-')}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PricingPage;