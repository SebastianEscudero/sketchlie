import { useState } from 'react';
import { Folder, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { ConfirmBoardModal } from '@/components/create-board-modal';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '@/components/ui/button';

interface NewFolderButtonProps {
  org: any;
  disabled?: boolean;
}

export const NewFolderButton = ({ org, disabled }: NewFolderButtonProps) => {
  const user = useCurrentUser();
  const [isCreating, setIsCreating] = useState(false);
  const { mutate: createFolder, pending } = useApiMutation(api.folders.create);
  const [folderName, setFolderName] = useState('New Folder');

  const handleClick = () => {
    if (disabled) return;

    setIsCreating(true);
    if (folderName) {
      createFolder({
        userId: user?.id,
        userName: user?.name,
        orgId: org.id,
        name: folderName
      })
        .then(() => {
          toast.success('Folder created successfully');
        })
        .catch(() => {
          toast.error('Failed to create folder');
        })
        .finally(() => {
          setIsCreating(false);
        });
    } else {
      setIsCreating(false);
    }
  };

  return (
    <ConfirmBoardModal
      header="Name your folder!"
      description="Folders are a great way to organize your boards."
      placeHolderText='Folder 1'
      disabled={pending}
      onConfirm={handleClick}
      setTitle={setFolderName}
    >
      <Button
        variant="dashboard"
        asChild
        size="lg"
        className="justify-start px-2 w-full hover:cursor-pointer"
        disabled={disabled || isCreating}
      >
        <div className="flex flex-row">
          <Folder className="h-4 w-4 mr-2" />
          New Folder
          <Plus className="h-4 w-4 ml-auto" />
        </div>
      </Button>
    </ConfirmBoardModal>
  );
};