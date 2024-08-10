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
  children: React.ReactNode;
}

export const NewFolderButton = ({ org, disabled, children }: NewFolderButtonProps) => {
  const user = useCurrentUser();
  const { mutate: createFolder, pending } = useApiMutation(api.folders.create);
  const [folderName, setFolderName] = useState('New Folder');

  const handleClick = () => {
    if (disabled) return;

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
        });
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
      {children}
    </ConfirmBoardModal>
  );
};