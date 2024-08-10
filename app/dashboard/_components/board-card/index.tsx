"use client";

import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { OnDropConfirmModal } from "@/components/on-drop-confirm-modal";

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
  org: any;
  isPrivate: boolean;
  user: any;
};

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
  org,
  isPrivate,
  user
}: BoardCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [droppedBoardId, setDroppedBoardId] = useState<string | null>(null);
  const [folderName, setFolderName] = useState('New Folder');

  const userId = useCurrentUser()?.id;
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const {
    mutate: onFavorite,
    pending: pendingFavorite,
  } = useApiMutation(api.board.favorite);
  const {
    mutate: onUnfavorite,
    pending: pendingUnfavorite,
  } = useApiMutation(api.board.unfavorite);
  const {
    mutate: createFolder,
    pending: pendingCreateFolder,
  } = useApiMutation(api.folders.create);
  const {
    mutate: updateBoardsFolder,
    pending: pendingUpdateBoardsFolder,
  } = useApiMutation(api.board.updateBoardsFolder);

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id, userId: userId })
        .catch(() => toast.error("Failed to unfavorite"))
    } else {
      onFavorite({ id, orgId, userId: userId })
        .catch(() => toast.error("Failed to favorite"))
    }

    if (!userId) {
      return null;
    }

  };

  const handleClick = () => {
    setIsLoading(true);
  };

  const handleDrop = (e: React.DragEvent, droppedOnBoardId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const data = e.dataTransfer.getData('text/plain');
    const { id: boardId } = JSON.parse(data);

    if (droppedOnBoardId === boardId) {
      return;
    }

    setDroppedBoardId(boardId);
    setIsModalOpen(true);
  };

  const onBoardDropConfirm = async () => {
    if (!userId || !droppedBoardId) return;

    try {
      const folderId = await createFolder({
        userId: userId,
        userName: user?.name || "",
        orgId: orgId,
        name: folderName,
      });

      if (folderId) {
        await updateBoardsFolder({
          boardIds: [id, droppedBoardId],
          folderId: folderId,
          userId: userId,
        });

        toast.success("Folder created and boards updated successfully");
      } else {
        throw new Error("Failed to create folder");
      }
    } catch (error) {
      console.error("Error creating folder or updating boards:", error);
      toast.error("Failed to create folder or update boards");
    } finally {
      setIsModalOpen(false);
      setDroppedBoardId(null);
    }
  }
  
  const handleDragStart = (event: any) => {
    const target = event.target;
    const rect = target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
  
    // Set the drag image to the center of the board element
    event.dataTransfer.setDragImage(target, centerX, centerY);
    event.dataTransfer.setData('text/plain', JSON.stringify({ id: id, folderId: undefined }));
  };

  return (
    <Link href={`/board/${id}`}>
      <div
        className={`group aspect-[100/127] border rounded-lg shadow-custom-1 flex flex-col justify-between overflow-hidden dark:bg-zinc-800 dark:border-zinc-700 bg-amber-50" ${isLoading ? 'opacity-80 transition-opacity cursor-not-allowed' : ''}`}
        onClick={handleClick}
        draggable={true}
        onDragStart={handleDragStart}
        onDrop={(e) => handleDrop(e, id)}
      >
        <div className="relative flex-1 dark:bg-white bg-amber-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fit"
          />
          <Overlay />
          <Actions
            org={org}
            id={id}
            title={title}
            side="right"
            isPrivate={isPrivate}
          >
            <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontal
                className="text-zinc-800 opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
      <OnDropConfirmModal
        header="Create a new folder"
        description={`Do you want to create a new folder with "${title}" and the dropped board?`}
        onConfirm={onBoardDropConfirm}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        setTitle={setFolderName}
      />
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};