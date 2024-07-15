"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";
import { EmptyOrg } from "@/components/empty-org";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Loading } from "@/components/auth/loading";
import { useProModal } from "@/hooks/use-pro-modal";
import Templates from "./_components/templates";
import { EmptyOrgSidebar } from "./_components/empty-org-sidebar";
import { themeCheck } from "@/lib/theme-utilts";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorites") || undefined
  const user = useCurrentUser();
  const [activeOrganization, setActiveOrganization] = useState<string | null>(null);
  const proModal = useProModal();

  useEffect(() => {
    themeCheck();
    if (searchParams.get("openProModal")) {
      proModal.onOpen(activeOrganization);
    }

    const activeLocalStorageOrganization = localStorage.getItem("activeOrganization");

    if (user?.organizations.find(org => org.id === activeLocalStorageOrganization)) {
      setActiveOrganization(localStorage.getItem("activeOrganization"));
    } else {
      setActiveOrganization(user?.organizations[0].id);
    }
  }, [user?.organizations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeOrganization) {
        localStorage.setItem("activeOrganization", activeOrganization);
      } else {
        if (user?.organizations && user?.organizations.length > 0) {
          setActiveOrganization(user.organizations[0].id);
        }
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [activeOrganization, user]);

  if (!user) return <Loading />;

  const activeOrg = user?.organizations.find(org => org.id === activeOrganization);

  return (
    <main className="h-full dark:bg-[#383838] dark:text-white bg-[#F9FAFB]">
      <div className="flex h-full">
      {activeOrg ? (
        <OrgSidebar
          setActiveOrganization={setActiveOrganization}
          activeOrganization={activeOrganization}
        />
      ) : (
        <EmptyOrgSidebar />
      )} 
      <div className="h-full flex-1">
        <Navbar
          setActiveOrganization={setActiveOrganization}
          activeOrganization={activeOrganization}
          activeOrg={activeOrg}
        />
        {activeOrg && (
          <Templates org={activeOrg}/>
        )}
        <div className="flex-1 h-[calc(100%] p-6">
          {!activeOrg ? (
            <EmptyOrg
              setActiveOrganization={setActiveOrganization}
              user={user}
            />
          ) : (
            <BoardList
              userId={user.id}
              org={activeOrg}
              query={{ search, favorites }}
            />
          )}
        </div>
      </div>
    </div>
    </main>
  );
};

export default DashboardPage;