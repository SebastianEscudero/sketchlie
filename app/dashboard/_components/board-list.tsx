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

interface BoardListProps {
  userId: string;
  org: any;
  query: {
    search?: string;
    favorites?: string;
    folderId?: string;
  };
}

export const BoardList = ({
  org,
  query,
  userId,
}: BoardListProps) => {
  const user = useCurrentUser();
  const usersRole = org?.users?.find((u: any) => u.id === user?.id)?.role;
  const folders = useQuery(api.folders.get, { orgId: org.id });
  const boards = useQuery(api.boards.get, {
    orgId: org.id,
    ...query,
    userId: userId,
  });

  if (folders === undefined || boards === undefined) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-5 mt-8 pb-10">
          <NewBoardButton user={user} usersRole={usersRole} org={org} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
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
      <h2 className="text-xl font-semibold mb-4 flex flex-row">
        {query.folderId && (
          <Link href="/dashboard/" className="flex flex-row items-center">
            <ChevronsLeft className="mr-3 h-8 w-8" />
          </Link>
        )}
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 mt-8 pb-10 gap-5">
        {query.folderId ? (
          <>
            <NewBoardButton user={user} usersRole={usersRole} org={org} query={query} />
            {boards.map((board: any) => (
              <BoardCard
                org={org}
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
            <NewBoardButton user={user} usersRole={usersRole} org={org} />
            {!query.favorites && (
              <FolderList
                folders={folders}
                groupedBoards={groupedBoards}
                org={org}
              />
            )}
            {groupedBoards['uncategorized']?.map((board: any) => (
              <BoardCard
                org={org}
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