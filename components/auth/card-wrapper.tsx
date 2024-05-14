"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-full sm:max-w-[65%] md:max-w-[55%] lg:max-w-[45%] xl:max-w-[35%] max-w-[95%] shadow-md border border-black p-8">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      {showSocial && (
          <CardContent>
            <Social />
          </CardContent>
      )}
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
