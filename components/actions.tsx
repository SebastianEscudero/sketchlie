"use client";

import { toast } from "sonner";
import { ArrowUpFromLine, ChevronRight, Link2, Pencil, Trash2 } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import { ConfirmModal } from "@/components/confirm-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { exportToSVG, exportToPNG } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  showExport?: boolean;
  org: any;
};

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
  showExport = false,
  org,
}: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`,
    )
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  };

  const router = useRouter();
  const user = useCurrentUser();
  const usersRole = org.users.find((u: any) => u.id === user?.id)?.role;
  if (!user) {
    return null;
  }

  const onDelete = () => {
    mutate({ id, userId: user.id })
      .then(() => toast.success("Board deleted"))
      .then(() => router.push("/dashboard/"))
      .catch(() => toast.error("Failed to delete board"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={usersRole !== "Admin"}
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer"
        >
          <Pencil className="h-4 w-4 mr-2" />
          {usersRole === "Admin" ? "Rename" : "Rename (Admin)"}
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its contents."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            disabled={usersRole !== "Admin"}
            variant="ghost"
            className="p-3 cursor-pointer w-full justify-start font-normal text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {usersRole === "Admin" ? "Delete" : "Delete (Admin)"}
          </Button>
        </ConfirmModal>
        {showExport && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DropdownMenuItem className="p-3 cursor-pointer flex justify-between">
                <div className="flex flex-row items-center">
                  <ArrowUpFromLine className="h-4 w-4 mr-2" />
                  Export 
                </div>
                <ChevronRight className="h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" sideOffset={8}>
              <DropdownMenuItem
                onClick={() => exportToPNG(title)}
                className="p-3 cursor-pointer"
              >
                to PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.info("Cooming soon")}
                className="p-3 cursor-pointer"
              >
                to SVG <Badge className="ml-2" variant="inProgress">SOON</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};