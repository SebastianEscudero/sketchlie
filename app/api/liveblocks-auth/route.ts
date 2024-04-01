import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { currentUser } from '@/lib/auth';


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(request: Request) {
    const user = await currentUser();


    if (!user) {
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();
    const board = await convex.query(api.board.get, { id: room });
    const authorized = user.organizations.some((org: { id: string }) => org.id === board?.orgId);

    if (!authorized) {
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.name || "Guest user",
        picture: user.image!,
    }

    const session = liveblocks.prepareSession(
        user.id,
        { userInfo }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS)
    }

    const { status, body } = await session.authorize();
    return new Response(body, { status },);
}