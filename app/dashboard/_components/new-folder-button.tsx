import { useState } from 'react';
import { toast } from 'sonner';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { ConfirmBoardModal } from '@/components/create-board-modal';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useOrganization } from '@/app/contexts/organization-context';

interface NewFolderButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export const NewFolderButton = ({ 
  disabled, 
  children 
}: NewFolderButtonProps) => {
  const user = useCurrentUser();
  const { currentOrganization } = useOrganization();
  const { mutate: createFolder, pending } = useApiMutation(api.folders.create);
  const [folderName, setFolderName] = useState('New Folder');

  const handleClick = () => {
    if (disabled || !currentOrganization || !user) return;

    createFolder({
      userId: user.id,
      userName: user.name,
      orgId: currentOrganization.id,
      name: folderName
    })
      .then(() => {
        toast.success('Folder created successfully');
      })
      .catch(() => {
        toast.error('Failed to create folder');
      });
  };

  return (
    <ConfirmBoardModal
      header="Name your folder!"
      description="Folders are a great way to organize your boards."
      placeHolderText='Folder 1'
      disabled={pending || !currentOrganization}
      onConfirm={handleClick}
      setTitle={setFolderName}
    >
      {children}
    </ConfirmBoardModal>
  );
};