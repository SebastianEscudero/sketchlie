import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import Image from 'next/image';
import { ChevronRight, Folder, Import, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { FolderActions } from '@/components/folder-actions';
import React from 'react';
import Link from 'next/link';

interface FolderListProps {
  folders: any[];
  groupedBoards: Record<string, any[]>;
  org: any;
}

export const FolderList = ({ folders, groupedBoards, org }: FolderListProps) => {
  const { mutate: updateBoardFolder } = useApiMutation(api.boards.updateFolder);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (event: any, boardId: string, folderId: string) => {
    const target = event.target;
    const rect = target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    event.dataTransfer.setDragImage(target, centerX, centerY);
    event.dataTransfer.setData('text/plain', JSON.stringify({ id: boardId, folderId: folderId }));
  };

  const handleDrop = (e: React.DragEvent, folderId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const data = e.dataTransfer.getData('text/plain');
    const { id: boardId, folderId: sourceFolderId } = JSON.parse(data);

    if (sourceFolderId === folderId) {
      return;
    }

    updateBoardFolder({
      boardId: boardId,
      folderId: folderId,
    }).then(() => {
      toast.success('Board moved to folder');
    });
  };

  return (
    <>
      {folders.map((folder) => (
        <Link key={folder._id} href={`/dashboard/?folder=${folder._id}`}>
          <div
            key={folder._id}
            className="border dark:border-zinc-800 group aspect-[100/127] rounded-lg flex flex-col items-center justify-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, folder._id)}
          >
            <div className="relative flex flex-wrap w-full h-full flex-1 rounded-t-lg bg-zinc-100 dark:bg-zinc-400 hover:bg-zinc-400 dark:hover:bg-zinc-500 p-1.5">
              {(!groupedBoards[folder._id] || groupedBoards[folder._id].length === 0) ? (
                  <div className='w-full flex flex-col items-center justify-center text-center p-4'>
                    <Import size={50} className='text-gray-800 mb-2' />
                    <p className='text-gray-600'>Drag your boards here</p>
                  </div>
                ) : (
                  groupedBoards[folder._id]?.slice(0, 4).map((board) => (
                    <div key={board._id} className="w-1/2 px-2 py-1 ">
                      <div
                        className="group aspect-[100/100] border rounded-lg flex flex-col justify-between overflow-hidden bg-amber-50 dark:bg-zinc-500 dark:border-zinc-800"
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, board._id, folder._id)}
                      >
                        <div className="relative flex-1">
                          <Image
                            src={board.imageUrl}
                            alt={board.title}
                            fill
                            className="object-fit"
                          />
                        </div>
                        <div className="relative dark:bg-[#2C2C2C] bg-zinc-100 p-1">
                          <p className="text-xs truncate text-black dark:text-white">
                            {board.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
            <div className="relative dark:bg-[#2C2C2C] bg-white rounded-b-lg p-2 w-full">
              <p className="text-[13px] truncate text-black dark:text-white">
                {folder.name}
              </p>
              <p className="transition-opacity text-[11px] truncate dark:text-zinc-300 text-muted-foreground flex flex-row items-center">
                <Folder className="inline-block w-4 h-4 mr-2" />
                {formatDistanceToNow(folder.createdAt, { addSuffix: true, })}
                <FolderActions
                id={folder._id}
                title={folder.name}
                org={org}
                side='right'
              >
                <button
                  className="absolute top-1 right-1 z-[1] px-3 py-2 outline-none"
                >
                  <MoreHorizontal
                    className="text-zinc-800 dark:text-white opacity-75 hover:opacity-100 transition-opacity"
                  />
                </button>
              </FolderActions>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

FolderList.Skeleton = function FolderListSkeleton() {
  return (
    <div className="col-span-1 aspect-[100/127] bg-gray-200 rounded animate-pulse"></div>
  );
};