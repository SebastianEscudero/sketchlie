"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";

interface RenameFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  folderTitle: string;
}

export const RenameFolderDialog = ({
  isOpen,
  onClose,
  id,
  folderTitle
}: RenameFolderDialogProps) => {
  const { 
    mutate, 
    pending
  } = useApiMutation(api.folders.update);

  const user = useCurrentUser();
  const [title, setTitle] = useState(folderTitle);

  useEffect(() => {
    setTitle(folderTitle);
  }, [folderTitle]);

  if (!user) {
    return null;
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();

    mutate({
      id: id,
      title,
      userId: user.id
    })
      .then(() => {
        toast.success("Folder renamed");
        onClose();
      })
      .catch(() => toast.error("Failed to rename folder"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[80%] sm:w-[60%] lg:w-[40%] xl:w-[30%] rounded-xl" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>
            Edit folder title
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a new title for this folder
        </DialogDescription>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-2">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Folder title"
            className="text-base py-1"
          />
          <div className="flex sm:flex-row flex-col sm:space-x-2 sm:space-y-0 space-y-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="border border-black">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit" variant="sketchlieBlue">
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};