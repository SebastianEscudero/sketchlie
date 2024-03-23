import { BotNavbar } from "@/components/bottom-navbar";
import { LandingNavbar } from "@/components/landing-navbar";

const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <main className= "bg-[#FFF3D9] font-sans font-light">
            <div className="mx-auto h-full">
                <LandingNavbar />
                {children}
                <BotNavbar />
            </div>
        </main>
     );
}
 
export default LandingLayout;