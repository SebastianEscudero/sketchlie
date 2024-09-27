"use client";

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Loading } from "@/components/auth/loading";
import { Layers } from "@/types/canvas";
import { themeCheck } from "@/lib/theme-utils";
import { useQuery } from "convex/react";

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

  const [layers, setLayers] = useState<Layers | null>(null);
  const [layerIds, setLayerIds] = useState<string[] | null>(null);

  useEffect(() => {
    themeCheck();

    const fetchLayers = async () => {
      const response = await fetch(`/api/r2-bucket/${params.boardId}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLayers(data.layers);
      setLayerIds(data.layerIds);
    }

    fetchLayers();
  }, [params]);

  // this is so that we can set the title of the page
  useEffect(() => {
    if (board && board.title) {
      document.title = `${board.title} | Sketchlie`;
    }
  }, [board]);

  if (!user || !board || layers === null || layerIds === null) {
    return <Loading />;
  }

  return (
    <Room roomId={params.boardId} board={board} layers={layers} layerIds={layerIds} fallback={<Loading />}>
      <Canvas boardId={params.boardId}/>
    </Room>
  );
};

export default BoardIdPage;