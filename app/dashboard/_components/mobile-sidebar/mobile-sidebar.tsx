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
            <SheetTrigger className="sm:hidden" asChild>
                <Button size='icon' variant='ghost' className='top-3 left-3'>
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="h-full flex p-3 flex-col text-white w-[70px] bg-blue-950 border-r border-[#172554]">
                    {activeOrganization !== null && activeOrganization !== "null" && (
                        <SheetClose>
                                <List
                                    activeOrganization={activeOrganization}
                                    setActiveOrganization={setActiveOrganization}
                                />
                        </SheetClose>
                    )}
                <NewOrgButton
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                />
            </SheetContent>
        </Sheet>
    )
}