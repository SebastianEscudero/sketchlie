"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { connectionIdToColor } from "@/lib/utils";
import { Presence } from "@/types/canvas";

interface CursorProps {
    connectionId: number;
    otherUserPresence: Presence | null;
    otherUserName?: string;
    zoom?: number;
};

export const Cursor = memo(({
    connectionId,
    otherUserPresence,
    otherUserName,
    zoom = 1
}: CursorProps) => {

    if (!otherUserPresence) {
        return null;
    }

    const cursor = otherUserPresence.cursor;
    const name = otherUserName || "Teammate";

    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;
    return (
        <foreignObject
            height={50/zoom}
            width={(name.length * 10 + 24)/zoom}
            className="relative"
            transform={`translate(${x}, ${y})`}
        >
            <MousePointer2
                style={{
                    fill: connectionIdToColor(connectionId),
                    color: connectionIdToColor(connectionId),
                    height: `${20/zoom}px`,
                    width: `${20/zoom}px`,
                }}
            />
            <div
                className="truncate text-white font-semibold flex items-center justify-start text-sm absolute rounded-md px-2 py-[2px]"
                style={{
                        backgroundColor: connectionIdToColor(connectionId),
                        scale: 1 / zoom,
                        transformOrigin: "top left",
                        top: `${18/zoom}px`, // Adjust for the height of the MousePointer2 plus padding
                        left: `${18/zoom }px`, // Adjust for the width of the MousePointer2 plus padding
                    }}
            >
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";