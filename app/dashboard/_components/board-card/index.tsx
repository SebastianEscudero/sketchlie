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
}: BoardCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
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