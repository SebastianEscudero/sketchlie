
import { BotNavbar } from "@/components/bottom-navbar";
import { LandingNavbar } from "@/components/landing-navbar";
import { cn } from "@/lib/utils";
import { mainFont } from "@/lib/font";

const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {

    return ( 
        <main className={cn("bg-white", mainFont.className)} >
            <div className="mx-auto h-full">
                <LandingNavbar />
                {children}
                <BotNavbar />
            </div>
        </main>
     );
}
 
export default LandingLayout;