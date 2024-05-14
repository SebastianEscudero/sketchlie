"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { connectionIdToColor } from "@/lib/utils";
import { Presence } from "@/types/canvas";

interface CursorProps {
    connectionId: string;
    otherUserPresence: Presence | null;
    otherUserName?: string;
};

export const Cursor = memo(({
    connectionId,
    otherUserPresence,
    otherUserName
}: CursorProps) => {

    if (!otherUserPresence) {
        return null;
    }

    const cursor = otherUserPresence.cursor
    const name = otherUserName || "Teammate";

    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;

    console.log(x, y);

    return (
        <foreignObject
            x={x}
            y={y}
            height={50}
            width={name.length * 10 + 24}
            className="relative drop-shadow-md"
        >
            <MousePointer2
                className="h-5 w-5"
                style={{
                    fill: connectionIdToColor(connectionId),
                    color: connectionIdToColor(connectionId),
                }}
            />
            <div
                className="rounded-md px-2 py-[1px] ml-4 mb-2 truncate text-xs text-white font-semibold inline-block"
                style={{ backgroundColor: connectionIdToColor(connectionId) }}
            >
                {name}
            </div>
        </foreignObject>
    )
});

Cursor.displayName = "Cursor";