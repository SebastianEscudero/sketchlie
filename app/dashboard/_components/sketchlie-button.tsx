import { useOrganization } from "@/app/contexts/organization-context";
import { Hint } from "@/components/hint";
import { useProModal } from "@/hooks/use-pro-modal";
import { ChevronsLeft, CircleAlert } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const SketchlieButton = () => {
    const proModal = useProModal();
    const { currentOrganization } = useOrganization();

    const getSubscriptionStatus = () => {
        if (!currentOrganization?.subscription?.mercadoPagoCurrentPeriodEnd) {
            return { showAlert: false, label: "" };
        }

        const subscriptionDate = new Date(currentOrganization.subscription.mercadoPagoCurrentPeriodEnd);
        const today = new Date();
        const diffInDays = Math.ceil((subscriptionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays > 2) {
            return { showAlert: false, label: "" };
        }

        if (diffInDays <= 0) {
            return { 
                showAlert: true, 
                label: "Subscription expired! Renew to edit boards." 
            };
        }

        if (diffInDays === 1) {
            return { 
                showAlert: true, 
                label: "Subscription expires today! Renew to continue editing boards." 
            };
        }

        return { 
            showAlert: true, 
            label: `Subscription expires in ${diffInDays} days! Renew to continue editing boards.` 
        };
    }

    const { showAlert, label } = getSubscriptionStatus();

    return (
        <div className="flex flex-row items-center">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <ChevronsLeft className="h-5 w-5 flex-shrink-0" />
                    <Image
                        src="/logos/logo.svg"
                        alt="Logo"
                        height={50}
                        width={50}
                        className="dark:hidden"
                    />
                    <Image
                        src="/logos/logo-dark-mode.svg"
                        alt="Logo"
                        height={50}
                        width={50}
                        className="hidden dark:block"
                    />
                    <span className="text-lg font-semibold">
                        Sketchlie
                    </span>
                </div>
            </Link>
            {showAlert && (
                <Hint label={label} sideOffset={10} side="right">
                    <CircleAlert 
                        className="fill-red-500 text-white ml-2 h-7 w-7 hover:cursor-pointer flex-shrink-0" 
                        onClick={proModal.onOpen} 
                    />
                </Hint>
            )}
        </div>
    )
}