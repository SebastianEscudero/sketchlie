"use client";

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";
import { useEffect } from "react";
import { toast } from "sonner";
import { Mouse } from "lucide-react";

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
      description: (
        <p className="flex flex-row">
          <Mouse size={16} className="mr-2"/> Right click and drag to move around the canvas!
        </p>
      ),
      position: "top-center",
      closeButton: true
    });
  })

  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;