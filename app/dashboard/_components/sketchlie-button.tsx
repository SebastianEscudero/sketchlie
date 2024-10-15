import { Hint } from "@/components/hint";
import { useProModal } from "@/hooks/use-pro-modal";
import { ChevronsLeft, CircleAlert } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

// Custom hook to force re-render on theme change
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Set initial theme
    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};

interface SketchlieButtonProps {
    activeOrg: any;
}

export const SketchlieButton = ({
    activeOrg
}: SketchlieButtonProps) => {
    const isDarkMode = useTheme();
    const proModal = useProModal();

    const onClick = () => {
        proModal.onOpen(activeOrg.id);
    }

    let label = "";
    let diffInDays = 0;
    if (activeOrg && activeOrg.subscription) {
        let subscriptionDate = new Date(activeOrg.subscription.mercadoPagoCurrentPeriodEnd);
        let today = new Date();
        diffInDays = Math.ceil((subscriptionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        label = "Subscription expired! Renew to edit boards.";
        if (diffInDays === 0 || diffInDays === -0) {
            label = "Subscription expires today! Renew to continue editing boards.";
        }
        if (diffInDays <= 2 && diffInDays > 0) {
            label = `Subscription expires in ${diffInDays} day(s)! Renew to continue editing boards.`;
        }
    }

    return (
        <div className="flex flex-row items-center">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <ChevronsLeft className="h-5 w-5 flex-shrink-0" />
                        <Image
                            src={isDarkMode ? "/logos/logo-dark-mode.svg" : "/logos/logo.svg"}
                            alt="Logo"
                            height={50}
                            width={50}
                        />
                    <span className="text-lg font-semibold">
                        Sketchlie
                    </span>
                </div>
            </Link>
            {diffInDays <= 2 && activeOrg && activeOrg.subscription && (
                <Hint label={label} sideOffset={10} side="right">
                    <CircleAlert className="fill-red-500 text-white ml-2 h-7 w-7 hover:cursor-pointer flex-shrink-0" onClick={onClick} />
                </Hint>
            )}
        </div>
    )
}
