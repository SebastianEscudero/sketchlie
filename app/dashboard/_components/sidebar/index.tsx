import { NewOrgButton } from "@/components/auth/org-button"
import { List } from "./list";

interface SideBarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const Sidebar = ({
    activeOrganization, 
    setActiveOrganization
}: SideBarProps) => {
    return (
        <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col text-white">
            <List 
                activeOrganization={activeOrganization}
                setActiveOrganization={setActiveOrganization}
            />
            <NewOrgButton 
                activeOrganization={activeOrganization}
                setActiveOrganization={setActiveOrganization}
            />
        </aside>
    )
}