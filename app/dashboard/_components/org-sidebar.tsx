"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { Infinity, LayoutDashboard, Shapes, SquareMousePointer, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SubscriptionButton } from "@/components/subscription-button";
import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface OrgSidebarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const OrgSidebar = ({
    activeOrganization,
    setActiveOrganization,
}: OrgSidebarProps) => {

    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);

    const subscriptionPlans = [
        {
            label: "Gratis",
            description: "Todo lo que necesitas para empezar a colaborar.",
            price: 0,
            features: {
                "Boards": "3",
                "Objetos máximos": "100",
                "Equipos": "1",
            },
        },
        {
            label: "Starter",
            description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
            price: 14990,
            features: {
                "Boards": "Ilimitados",
                "Objetos máximos": "1000",
                "Equipos": "10",
            },
        },
        {
            label: "Business",
            description: "Escala tu equipo con herramientas de colaboración avanzadas y soporte prioritario.",
            price: 19990,
            features: {
                "Boards": "Ilimitados",
                "Objetos máximos": "Ilimitados",
                "Equipos": "Ilimitados",
            },
            extraFeatures: "Proteccón de datos con inicio de sesión",
            recommended: true
        },
    ]

    const featureIcons: { [key: string]: JSX.Element } = {
        "Boards": <SquareMousePointer className="h-4 w-4" />,
        "Objetos máximos": <Shapes className="h-4 w-4" />,
        "Equipos": <Users className="h-4 w-4" />,
    };

    const plan = subscriptionPlans.find(plan => plan.label === activeOrg.subscriptionPlan);
    const isPro = false
    const proModal = useProModal();
    const onClick = () => {
        proModal.onOpen();
    }

    return (
        <div className="hidden lg:flex flex-col space-y-2 w-[206px] pl-5 pt-5">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={60}
                        width={60}
                    />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className,
                    )}>
                        Sketchlie
                    </span>
                </div>
            </Link>
            {activeOrg && (
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex outline-none">
                            <Button
                                className="text-[16px]"
                                variant={plan?.label === "Gratis" ? "gratis" : plan?.label === "Starter" ? "starter" : "business"}
                            >
                                <span className={cn(
                                    "text-lg",
                                    font.className,
                                )}>
                                    Plan {plan?.label}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <div className="px-3 py-2 flex flex-col space-y-3">
                                <p className="font-semibold">{activeOrg.name} esta con plan {plan?.label}</p>
                                <div className="text-sm space-y-2">
                                    {
                                        plan && Object.entries(plan.features).map(([feature, value]) => (
                                            <div key={feature} className="flex flex-row gap-x-2">
                                                {featureIcons[feature]} {feature}: {value}
                                            </div>
                                        ))
                                    }
                                </div>
                                {plan?.label !== "Business" && (
                                    <div className="bg-blue-100/70 p-3 space-y-2">
                                        <p className="flex flex-row items-center">
                                            <Infinity className="w-4 h-4 mr-2 text-custom-blue" /> Crea tableros ilimitados
                                        </p>
                                        <p className="flex flex-row items-center">
                                            <Infinity className="w-4 h-4 mr-2 text-custom-blue" /> Objetos ilimitados
                                        </p>
                                        <Button variant="auth" onClick={onClick} className="w-full">
                                            {isPro ? "Pausar Subscripcion" : "Upgrade"}
                                            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
            <OrganizationSwitcher
                setActiveOrganization={setActiveOrganization}
                activeOrganization={activeOrganization}
            />
            <div className="space-y-1 w-full">
                <Button
                    variant={favorites ? "ghost" : "secondary"}
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                >
                    <Link href="/dashboard">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team boards
                    </Link>
                </Button>
                <Button
                    variant={favorites ? "secondary" : "ghost"}
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                >
                    <Link href={{
                        pathname: "/dashboard",
                        query: { favorites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        Favorite boards
                    </Link>
                </Button>
            </div>
        </div>
    );
};