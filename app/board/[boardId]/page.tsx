"use client";

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { useConvex } from "convex/react";
import { Loading } from "@/components/auth/loading";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {

  const user = useCurrentUser();
  const [board, setBoard] = useState<{
    _id: Id<"boards">;
    _creationTime: number;
    layers?: any;
    title: string;
    orgId: string;
    authorId: string;
    authorName: string;
    imageUrl: string;
    layerIds: string[];
  } | null>(null);

  const convex = useConvex();

  useEffect(() => {
    const fetchBoard = async () => {
      const fetchedBoard = await convex.query(api.board.get, {
        id: params.boardId as Id<"boards">
      });
      setBoard(fetchedBoard);
    };
    fetchBoard();

    const handleTitleChange = () => {
      fetchBoard();
    };
    window.addEventListener('boardTitleChanged', handleTitleChange);
    return () => {
      window.removeEventListener('boardTitleChanged', handleTitleChange);
    };
  }, [params]);

  if (!user || !board) {
    return <Loading />;
  }

  return (
    <Room roomId={params.boardId} board={board} userInfo={user} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;