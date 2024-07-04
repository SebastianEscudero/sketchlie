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

    const cursor = otherUserPresence.cursor
    const name = otherUserName || "Teammate";

    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;

    return (
        <g transform={`translate(${x}, ${y})`}>
            <foreignObject
                height={50 / zoom}
                width={(name.length * 10 + 24) / zoom}
                className="relative"
            >
                <div className="flex">
                    <MousePointer2
                        style={{
                            fill: connectionIdToColor(connectionId),
                            color: connectionIdToColor(connectionId),
                            height: `${20 / zoom}px`,
                            width: `${20 / zoom}px`,
                        }}
                    />
                    <div
                        className="truncate text-white font-semibold inline-block"
                        style={{ 
                            backgroundColor: connectionIdToColor(connectionId) ,
                            fontSize: `${12 / zoom}px`,
                            lineHeight: `${12 / zoom}px`,
                            paddingLeft: `${8 / zoom}px`,
                            paddingRight: `${8 / zoom}px`,
                            paddingTop: `${4 / zoom}px`,
                            paddingBottom: `${4 / zoom}px`,
                            borderRadius: `${4 / zoom}px`,
                            marginTop: `${20 / zoom}px`,
                            marginBottom: 0
                        }}
                    >
                        {name}
                    </div>
                </div>
            </foreignObject>
        </g>
    )
});

Cursor.displayName = "Cursor";