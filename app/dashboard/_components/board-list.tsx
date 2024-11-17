"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { NewBoardButton } from "./new-board-button";
import { FolderList } from "./folder-list";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useOrganization } from "@/app/contexts/organization-context";

interface BoardListProps {
  query: {
    search?: string;
    favorites?: string;
    folderId?: string;
  };
}

export const BoardListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-5 mt-8 pb-10">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className="aspect-[100/100] rounded-lg bg-zinc-200 dark:bg-zinc-700 animate-pulse" 
          />
        ))}
      </div>
    </div>
  );
};

export const BoardList = ({ query }: BoardListProps) => {
  const user = useCurrentUser();
  const { currentOrganization, isLoading } = useOrganization();

  const folders = useQuery(api.folders.get, { 
    orgId: currentOrganization?.id ?? "" 
  });
  
  const boards = useQuery(api.boards.get, {
    orgId: currentOrganization?.id ?? "",
    ...query,
    userId: user?.id,
  });

  if (!currentOrganization || isLoading || !user) {
    return <BoardListSkeleton />;
  }

  if (folders === undefined || boards === undefined) {
    return <BoardListSkeleton />;
  }

  if (!boards?.length && query.search) {
    return <EmptySearch />;
  }

  if (!boards?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  const groupedBoards = boards.reduce((acc, board) => {
    const folderId = board.folderId || 'uncategorized';
    if (!acc[folderId]) {
      acc[folderId] = [];
    }
    acc[folderId].push(board);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-x-2">
        {query.folderId && (
          <Link href="/dashboard/" className="hover:opacity-75 transition">
            <ChevronsLeft className="h-8 w-8" />
          </Link>
        )}
        <span>
          {query.favorites ? "Favorite boards" : "Team boards"}
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 mt-8 pb-10 gap-5">
        {query.folderId ? (
          <>
            <NewBoardButton query={query} />
            {boards.map((board: any) => (
              <BoardCard
                org={currentOrganization}
                key={board._id}
                id={board._id}
                title={board.title}
                imageUrl={board.imageUrl}
                authorId={board.authorId}
                authorName={board.authorName}
                createdAt={board._creationTime}
                orgId={board.orgId}
                isFavorite={board.isFavorite}
                isPrivate={board.private}
                user={user}
              />
            ))}
          </>
        ) : (
          <>
            <NewBoardButton />
            {!query.favorites && (
              <FolderList
                folders={folders}
                groupedBoards={groupedBoards}
                org={currentOrganization}
              />
            )}
            {groupedBoards['uncategorized']?.map((board: any) => (
              <BoardCard
                org={currentOrganization}
                key={board._id}
                id={board._id}
                title={board.title}
                imageUrl={board.imageUrl}
                authorId={board.authorId}
                authorName={board.authorName}
                createdAt={board._creationTime}
                orgId={board.orgId}
                isFavorite={board.isFavorite}
                isPrivate={board.private}
                user={user}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};