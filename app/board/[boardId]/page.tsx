"use client";

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";
import { useEffect } from "react";
import { toast } from "sonner";
import { Mouse } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {
  
  const user = useCurrentUser();
  const board = useQuery(api.board.get, {
    id: params.boardId as Id<"boards">
  });

  useEffect(() => {
    toast("Heads up!", {
      description: (
        <p className="flex flex-row">
          <Mouse size={16} className="mr-2"/> Right click and drag to move around the canvas!
        </p>
      ),
      position: "top-center",
      closeButton: true
    });
  }, [])

  if (!user || !board) {
    return <Loading />;
  }

  return (
    <Room roomId={params.boardId} board={board} userInfo={user} fallback={<Loading />}>
      <Canvas boardId={params.boardId}/>
    </Room>
  );
};

export default BoardIdPage;