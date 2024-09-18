"use client";

import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal, Star } from "lucide-react";
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
import { cn } from "@/lib/utils";

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

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

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
        className={`group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden bg-amber-50 dark:bg-zinc-500 dark:border-zinc-800 " ${isLoading ? 'opacity-80 transition-opacity cursor-not-allowed' : ''}`}
        onClick={handleClick}
        draggable={true}
        onDragStart={handleDragStart}
        onDrop={(e) => handleDrop(e, id)}
      >
        <div className="relative flex-1">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fit p-3"
          />
          <Overlay />
          <button
            disabled={pendingFavorite || pendingUnfavorite}
            onClick={toggleFavorite}
            className={cn(
              "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 dark:text-white dark:hover:text-blue-600 text-muted-foreground hover:text-blue-600",
              pendingFavorite || pendingUnfavorite && "cursor-not-allowed opacity-75"
            )}
          >
            <Star
              className={cn(
                "h-4 w-4",
                isFavorite && "fill-blue-600 text-blue-600"
              )}
            />
          </button>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disabled={pendingFavorite || pendingUnfavorite}
          org={org}
          id={id}
          isPrivate={isPrivate}
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