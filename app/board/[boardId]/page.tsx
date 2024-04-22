"use client";

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";
import { useEffect } from "react";
import { toast } from "sonner";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {
  
  useEffect(() => {
    toast("Heads up!", {
      description: "Right click and drag to move around the canvas!",
      position: "top-center",
    });
  })

  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;