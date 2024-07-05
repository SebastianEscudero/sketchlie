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
        <aside className="fixed z-[1] top-0 bg-zinc-600 w-[65%] rounded-br-lg h-[60px] flex flex-row p-3 text-white">
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