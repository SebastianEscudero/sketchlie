import { NewOrgButton } from "@/components/auth/org-button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { List } from "../sidebar/list";

interface SideBarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const MobileSidebar = ({
    activeOrganization,
    setActiveOrganization
}: SideBarProps) => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button size='icon' variant='ghost' className='top-3 left-3'>
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="h-full flex p-3 flex-col text-white w-[70px] dark:bg-[#2C2C2C] bg-gray-800 dark:border-zinc-500 border-r ">
                    <SheetClose>
                            <List
                                activeOrganization={activeOrganization}
                                setActiveOrganization={setActiveOrganization}
                            />
                    </SheetClose>
                <NewOrgButton
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                />
            </SheetContent>
        </Sheet>
    )
}