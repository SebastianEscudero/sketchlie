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
    const color = connectionIdToColor(connectionId);

    return (
        <foreignObject
            height={50}
            width={name.length * 10 + 24}
            className="relative overflow-visible"
            transform={`translate(${x}, ${y}) scale(${1/zoom})`}
        >
            <div className="flex flex-col items-start max-w-[250px] truncate">
                <MousePointer2
                    style={{
                        fill: color,
                        color: color,
                        height: window.innerWidth > 768 ? 20 : 15,
                        width: window.innerWidth > 768 ? 20 : 15,
                    }}
                />
                <span
                    className="text-white font-semibold truncate text-xs sm:text-sm rounded-md px-2 py-[2px] ml-5 max-w-[200px]"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    {name}
                </span>
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";