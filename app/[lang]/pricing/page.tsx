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
import { translations } from "@/public/locales/pricing";
import { Language } from "@/types/canvas";

export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
    const lang = params.lang;
    const t = translations[lang];

    return {
        title: t.metadata.title,
        description: t.metadata.description,
        keywords: t.metadata.keywords,
        alternates: {
            canonical: `https://www.sketchlie.com/${lang}/pricing/`,
        },
    };
}

const plans = subscriptionPlans

const PricingPage = ({ params }: { params: { lang: Language } }) => {
    const lang = params.lang;
    const t = translations[lang];

    // Create a list of all unique features across all plans
    const allFeatures = Array.from(new Set(plans.flatMap(plan => Object.keys(plan.features || {}))))

    return (
        <div className="bg-amber-50 min-h-screen">
            <Breadcrumb className="xl:mx-[15%] lg:mx-[5%] mx-[2%] pt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title={t.breadcrumb.home}>{t.breadcrumb.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{t.breadcrumb.pricing}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col justify-center items-center py-16 xl:mx-[15%] lg:mx-[5%] mx-[2%]">
                <h1 className="text-4xl font-bold text-center mb-4">{t.title}</h1>
                <p className="text-xl text-gray-600 text-center mb-12">{t.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    {plans.map((subscriptionPlan) => (
                        <Card
                            key={subscriptionPlan.label}
                            className={`p-6 flex flex-col h-full bg-amber-50 dark:bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
                                subscriptionPlan.label === "Enterprise" 
                                    ? 'border-2 border-purple-500 scale-100 dark:border-purple-500' 
                                    : subscriptionPlan.recommended 
                                    ? 'border-2 border-blue-500 scale-105 dark:border-blue-500' 
                                    : 'border border-black dark:border-black'
                            }`}
                        >
                            <div className="flex flex-col h-full">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">{subscriptionPlan.label}</h2>
                                    {subscriptionPlan.recommended && (
                                        <Badge variant="sketchlieBlue" className="mt-2">
                                            {t.popular}
                                        </Badge>
                                    )}
                                    {subscriptionPlan.label === "Enterprise" && (
                                        <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-800">
                                            {t.mostPowerful}
                                        </Badge>
                                    )}
                                    <p className="text-sm text-gray-600 mt-2">{subscriptionPlan.description}</p>
                                </div>
                                {subscriptionPlan.price !== undefined && (
                                    <div className="text-3xl font-bold text-gray-900 mb-4">
                                        ${subscriptionPlan.price}<span className="text-lg font-normal text-gray-600">/{t.month}</span>
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-gray-700 mb-3">{subscriptionPlan.characteristicsDescription}</p>
                                    {subscriptionPlan.label === "Enterprise" ? (
                                        <>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Infinity className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">{t.allYouNeed}</span>
                                            </div>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">{t.allAITools}</span>
                                            </div>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">{t.worldClassSupport}</span>
                                            </div>
                                            <div className="flex items-center gap-x-3 text-sm mb-2">
                                                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                                <span className="font-semibold text-gray-800">{t.dataProtection}</span>
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
                                            {t.startFree}
                                        </Button>
                                    </Link>
                                ) : subscriptionPlan.label === "Enterprise" ? (
                                    <Link href={`/${lang}/contact`} className='w-full mt-6'>
                                        <Button variant="default" className="w-full text-lg bg-purple-600 text-white hover:bg-purple-700">
                                            {t.contactUs}
                                        </Button>
                                    </Link>
                                ) : subscriptionPlan.label === "Starter" ? (
                                    <Link href='/dashboard?openProModal=true' className='w-full mt-6'>
                                        <Button variant="outline" className="w-full text-lg border-blue-600 text-blue-600 hover:bg-blue-50">
                                            {t.buyStarter}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href='/dashboard?openProModal=true' className='w-full mt-6'>
                                        <Button variant="default" className="w-full text-lg bg-blue-600 text-white hover:bg-blue-700">
                                            {t.upgrade} <Zap className="w-4 h-4 ml-2 fill-white" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Comparison Matrix */}
                <div className="mt-20 w-full overflow-x-auto text-black">
                    <h2 className="text-3xl font-bold text-center mb-8">{t.planComparison}</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-amber-100">
                                <th className="p-4 text-left font-semibold">{t.feature}</th>
                                {plans.map(plan => (
                                    <th key={plan.label} className="p-4 text-center font-semibold">{plan.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allFeatures.map((feature, index) => (
                                <tr key={feature} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-amber-100'}>
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
                            <tr className={allFeatures.length % 2 === 0 ? 'bg-amber-50' : 'bg-amber-100'}>
                                <td className="p-4 font-medium">{t.extraFeatures}</td>
                                {plans.map(plan => (
                                    <td key={`${plan.label}-extra`} className="p-4 text-center">
                                        {plan.label === "Enterprise" ? t.allAITools : (plan.extraFeatures || '-')}
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