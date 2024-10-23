import { memo } from "react";
import { Cursor } from "./cursor";
import { User } from '@/types/canvas';
import { colorToCss } from "@/lib/utils";
import { Path } from "../canvas-objects/path";

interface CursorsProps {
    otherUsers: User[];
    zoom?: number;
}

const Cursors = ({
    otherUsers,
    zoom
}: CursorsProps) => {
    return (
        <>
            {otherUsers.map((otherUser) => (
                <Cursor
                    zoom={zoom}
                    otherUserName = {otherUser.information?.name}
                    key={otherUser.userId}
                    connectionId={otherUser.connectionId}
                    otherUserPresence={otherUser.presence}
                />
            ))}
        </>
    );
};

const Drafts = ({
    otherUsers,
    zoom
}: CursorsProps) => {
    return (
        <>
            {otherUsers.map((otherUser) => {
                if (otherUser.presence?.pencilDraft) {
                    const isLaser = otherUser.presence.pathStrokeColor?.r === 255 && 
                                  otherUser.presence.pathStrokeColor?.g === 0 && 
                                  otherUser.presence.pathStrokeColor?.b === 0 &&
                                  otherUser.presence.pathStrokeColor?.a === 1;

                    return (
                        <Path
                            key={otherUser.userId}
                            x={0}
                            y={0}
                            points={otherUser.presence.pencilDraft}
                            strokeSize={otherUser.presence.pathStrokeSize}
                            fill={colorToCss(otherUser.presence.pathStrokeColor || { r: 1, g: 1, b: 1, a: 1 })}
                            isLaser={isLaser}
                            zoom={zoom}
                        />
                    );
                }

                return null;
            })}
        </>
    )
}

export const CursorsPresence = memo(({
    otherUsers,
    zoom,
}: CursorsProps) => {
    return (
        <>
            <Drafts otherUsers={otherUsers} zoom={zoom} />
            <Cursors otherUsers={otherUsers} zoom={zoom} />
        </>
    );
});

CursorsPresence.displayName = "CursorsPresence";
