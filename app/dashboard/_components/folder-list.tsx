import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import Image from 'next/image';
import { ChevronRight, Import, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { BoardCard } from './board-card';
import { FolderActions } from '@/components/folder-actions';

interface FolderListProps {
  folders: any[];
  groupedBoards: Record<string, any[]>;
  org: any;
  query: any;
  onToggleFolder: (folderId: string) => void;
  expandedFolder: string | null;
}

export const FolderList = ({ folders, groupedBoards, org, query, onToggleFolder, expandedFolder }: FolderListProps) => {
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
        <>
          <div
            key={folder._id}
            className=" shadow-custom-1 border dark:border-zinc-700 group aspect-[100/127] rounded-lg flex flex-col items-center justify-center cursor-pointer"
            onClick={() => onToggleFolder(folder._id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, folder._id)}
          >
            <div className="relative flex flex-wrap w-full h-full flex-1 rounded-t-lg bg-zinc-300 hover:bg-zinc-400 p-1.5">
              <FolderActions
                id={folder._id}
                title={folder.name}
                org={org}
                side='right'
              >
                <button
                  className="absolute top-1 right-1 z-[1] opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
                >
                  <MoreHorizontal
                    className="text-black opacity-75 hover:opacity-100 transition-opacity"
                  />
                </button>
              </FolderActions>
              {expandedFolder === folder._id ? (
                <div className='w-full flex items-center justify-center'>
                  <ChevronRight size={80} className="text-gray-800" />
                </div>
              ) : (
                (!groupedBoards[folder._id] || groupedBoards[folder._id].length === 0) ? (
                  <div className='w-full flex flex-col items-center justify-center text-center'>
                    <Import size={50} className='text-gray-800 mb-2' />
                    <p className='text-gray-600'>Drag your board here</p>
                  </div>
                ) : (
                  groupedBoards[folder._id]?.slice(0, 4).map((board) => (
                    <div key={board._id} className="w-1/2 px-2 py-1">
                      <div
                        className="group aspect-[120/127] border rounded-lg shadow-custom-1 flex flex-col justify-between overflow-hidden dark:bg-zinc-800 dark:border-zinc-700 bg-amber-50"
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, board._id, folder._id)}
                      >
                        <div className="relative flex-1 dark:bg-white bg-amber-50">
                          <Image
                            src={board.imageUrl}
                            alt={board.title}
                            fill
                            className="object-fit"
                          />
                        </div>
                        <div className="relative dark:bg-[#2C2C2C] bg-zinc-100 p-2">
                          <p className="text-[10px] truncate text-black dark:text-white">
                            {board.title}
                          </p>
                          <p className="transition-opacity text-[8px] truncate dark:text-zinc-300 text-muted-foreground">
                            {board.authorName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
            <div className="relative dark:bg-[#2C2C2C] bg-zinc-100 p-3 w-full">
              <p className="text-[13px] truncate text-black dark:text-white">
                {folder.name}
              </p>
              <p className="transition-opacity text-[11px] truncate dark:text-zinc-300 text-muted-foreground">
                {formatDistanceToNow(folder.createdAt, { addSuffix: true, })}
              </p>
            </div>
          </div>
          {expandedFolder && expandedFolder === folder._id && (
            groupedBoards[expandedFolder]?.map((board: any) => (
              <BoardCard
                org={org}
                key={board._id}
                id={board._id}
                title={board.title}
                imageUrl={board.imageUrl}
                authorId={board.authorId}
                authorName={board.authorName}
                createdAt={board._creationTime}
                orgId={board.orgId}
                isFavorite={board.isFavorite}
                isPrivate={board.private}
              />
            ))
          )}
        </>
      ))}
    </>
  );
};

FolderList.Skeleton = function FolderListSkeleton() {
  return (
    <div className="col-span-1 aspect-[100/127] bg-gray-200 rounded animate-pulse"></div>
  );
};