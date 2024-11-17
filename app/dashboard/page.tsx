"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSearchParams } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { useProModal } from "@/hooks/use-pro-modal";
import { themeCheck } from "@/lib/theme-utils";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { acceptInvite } from "@/actions/accept-invite";
import { useSession } from "next-auth/react";
import { useOrganization } from "../contexts/organization-context";
import { Templates } from "./_components/templates";
import { BoardList } from "./_components/board-list";

const DashboardPage = () => {
  const { update } = useSession();
  const searchParams = useSearchParams();
  const proModal = useProModal();
  const { currentOrganization, setCurrentOrganizationId } = useOrganization();

  const params = {
    search: searchParams.get("search") || undefined,
    organizationId: searchParams.get("org") || undefined,
    invitationId: searchParams.get("invitationId") || undefined,
    folderId: searchParams.get("folder") || undefined,
    favorites: searchParams.get("favorites") || undefined,
  };

  useEffect(() => {
    themeCheck();

    if (searchParams.get("openProModal")) {
      proModal.onOpen();
    }

    if (params.organizationId && params.invitationId) {
      acceptInvite(params.organizationId, params.invitationId).then(() => {
        setCurrentOrganizationId(params.organizationId!);
        update({ event: "session" });
      });
    }
  }, [currentOrganization, params]);

  useEffect(() => {
    document.title = 'Dashboard | Sketchlie';
  }, []);

  const { mutate: updateBoardFolder } = useApiMutation(api.boards.updateFolder);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = e.dataTransfer.getData('text/plain');
    const { id: boardId, folderId: sourceFolderId } = JSON.parse(data);

    if (!sourceFolderId) return;

    updateBoardFolder({
      boardId: boardId,
      folderId: undefined,
    }).then(() => {
      toast.success('Board moved outside of the folder');
    });
  };

  return (
    <main className="h-full dark:bg-[#383838] dark:text-white bg-[#f9fafb]">
      <div className="flex h-full">
        <OrgSidebar mobile={false} />
        <ScrollArea
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="h-full flex-1 flex flex-col"
        >
          <Navbar />
          <Templates />
          <div className="flex-1 h-[calc(100%-64px)] lg:p-6 p-4">
            <BoardList query={params} />
          </div>
        </ScrollArea>
      </div>
    </main>
  );
};

export default DashboardPage;