import { memo } from "react";
import { Cursor } from "./cursor";
import { User } from '@/types/canvas';
import { colorToCss } from "@/lib/utils";
import { Path } from "../canvas-objects/path";

interface CursorsProps {
    otherUsers: User[];
}

const Cursors = ({
    otherUsers
}: CursorsProps) => {
    return (
        <>
            {otherUsers.map((otherUser) => (
                <Cursor
                    otherUserName = {otherUser.information?.name}
                    key={otherUser.userId}
                    connectionId={otherUser.userId}
                    otherUserPresence={otherUser.presence}
                />
            ))}
        </>
    );
};

const Drafts = ({
    otherUsers
}: CursorsProps) => {
    return (
        <>
            {otherUsers.map((otherUser) => {
                if (otherUser.presence?.pencilDraft) {
                    return (
                        <Path
                            key={otherUser.userId}
                            x={0}
                            y={0}
                            points={otherUser.presence.pencilDraft}
                            strokeSize={otherUser.presence.pathStrokeSize}
                            fill={colorToCss(otherUser.presence.pathStrokeColor || { r: 1, g: 1, b: 1, a: 1 })}
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
}: CursorsProps) => {
    return (
        <>
            <Drafts otherUsers={otherUsers} />
            <Cursors otherUsers={otherUsers} />
        </>
    );
});

CursorsPresence.displayName = "CursorsPresence";