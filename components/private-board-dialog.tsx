import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

interface PrivateBoardDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isPrivate: boolean;
    boardId: string;
}

export const PrivateBoardDialog = ({
    isOpen,
    setIsOpen,
    isPrivate,
    boardId,
}: PrivateBoardDialogProps) => {
    const currentUser = useCurrentUser();
    const { mutate: togglePrivate, pending } = useApiMutation(api.board.togglePrivate);

    const handleTogglePrivacy = async () => {
        if (!currentUser?.id) {
            toast.error("You must be logged in to change board privacy");
            return;
        }

        try {
            await togglePrivate({ 
                id: boardId, 
                userId: currentUser.id 
            });
            setIsOpen(false);
            toast.success(`Board is now ${!isPrivate ? 'private' : 'public'}`);
        } catch (error) {
            toast.error("Failed to change board privacy");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-[80%] sm:w-[60%] lg:w-[40%] xl:w-[30%] rounded-xl" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>
                        {isPrivate ? "Make board public?" : "Make board private?"}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {isPrivate ? "This will make the board public, any user who connects with the link will be automatically added to the organization as a member role." : "This will make the board private, only users you invite to the organization will be able to access the board."}
                </DialogDescription>
                <div className="flex sm:flex-row flex-col sm:space-x-2 sm:space-y-0 space-y-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="border border-black">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button 
                        type="submit" 
                        variant="sketchlieBlue" 
                        onClick={handleTogglePrivacy}
                        disabled={pending}
                    >
                        {pending ? "Changing..." : "Confirm"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}