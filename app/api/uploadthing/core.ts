import { currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const HandleAuth = async () => {
    const user = await currentUser();
    const userId = user?.id
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return { userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    Image: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(() => HandleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;