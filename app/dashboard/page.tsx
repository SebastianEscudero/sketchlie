"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";
import { EmptyOrg } from "@/components/empty-org";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { Loading } from "@/components/auth/loading";
import { useProModal } from "@/hooks/use-pro-modal";
import Templates from "./_components/templates";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorites") || undefined
  const [activeOrganization, setActiveOrganization] = useState<string | null>(null);
  const user = useCurrentUser();
  const proModal = useProModal();

  useEffect(() => {
    document.body.style.cursor = 'default';
    setActiveOrganization(localStorage.getItem("activeOrganization"));
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeOrganization) {
        localStorage.setItem("activeOrganization", activeOrganization);
      } else {
        if (user?.organizations && user?.organizations.length > 0) {
          setActiveOrganization(user.organizations[0].id);
        }
      }
    }, 10); // 10 milliseconds = 0.01 seconds
  
    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [activeOrganization, user]);

  useEffect(() => {
    if (searchParams.get("openProModal")) {
        proModal.onOpen(activeOrganization);
    }
}, []);

  if (!user) return <Loading />;

  const activeOrg = user?.organizations.find(org => org.id === activeOrganization);

  return (
    <main className="h-full">
      <div className="hidden sm:flex">
        <Sidebar
          activeOrganization={activeOrganization}
          setActiveOrganization={setActiveOrganization}
        />
      </div>
      <div className="sm:pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar 
            setActiveOrganization={setActiveOrganization}
            activeOrganization={activeOrganization}
          />
          <div className="h-full flex-1">
            <Navbar 
              setActiveOrganization={setActiveOrganization}
              activeOrganization={activeOrganization}
              activeOrg={activeOrg}
            />
            {activeOrg && (
              <Templates 
                org={activeOrg}
              />
            )}
            <div className="flex-1 h-[calc(100%-80px)] p-6">
              {!activeOrg ? (
                <EmptyOrg 
                  setActiveOrganization={setActiveOrganization} 
                  user={user}
                />
              ) : (
                <BoardList
                  userId={user.id}
                  org={activeOrg}
                  query={{search, favorites }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
 
export default DashboardPage;