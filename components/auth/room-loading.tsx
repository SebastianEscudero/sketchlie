import { Loader2 } from "lucide-react";

interface RoomLoadingProps {
    label?: string;
}

export const RoomLoading = ({
    label
}: RoomLoadingProps) => {
    return (
        <div className='h-full w-full flex flex-col dark:bg-[#101011] bg-[#F9FAFB'>
            {/* Center message or loader */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {label ? (
                    <h2 className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
                        {label}
                    </h2>
                ) : (
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                )}
            </div>

            {/* Info skeleton */}
            <div className="h-12 absolute top-2 left-2 flex items-center gap-x-2 bg-white dark:bg-zinc-800 p-1.5 rounded-lg shadow-sm">
                {/* Back button */}
                <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                {/* Title */}
                <div className="h-7 w-40 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                {/* Actions */}
                <div className="flex items-center space-x-1">
                    <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    <div className="h-7 w-7 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                </div>
            </div>

            {/* Participants skeleton */}
            <div className="h-12 absolute top-2 right-2 flex items-center gap-x-2 bg-white dark:bg-zinc-800 p-1.5 rounded-lg shadow-sm">
                {/* Comments button */}
                <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                {/* Users */}
                <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse ring-2 ring-background" />
                    ))}
                </div>
                {/* Present button */}
                <div className="hidden md:block h-8 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                {/* Share button */}
                <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
            </div>

            {/* Bottom toolbar skeleton */}
            <div className="h-[52px] absolute bottom-4 left-1/2 -translate-x-1/2 flex sm:flex-row flex-col-reverse sm:gap-x-4 gap-x-0 sm:gap-y-0 gap-y-2">
                {/* Main tools */}
                <div className="flex gap-x-1 flex-row h-auto bg-white dark:bg-zinc-800 p-1.5 rounded-lg shadow-sm">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                    ))}
                </div>
                {/* Undo/Redo */}
                <div className="flex gap-x-1 flex-row h-auto bg-white dark:bg-zinc-800 p-1.5 rounded-lg shadow-sm">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                    ))}
                </div>
            </div>

             {/* Bottom right toolbar skeleton */}
             <div className="h-[52px] absolute bottom-4 right-2 lg:flex hidden">
                <div className="flex items-center space-x-1 bg-white dark:bg-zinc-800 p-1.5 rounded-lg shadow-sm">
                    {/* Move and Focus buttons */}
                    <div className="flex items-center border-r pr-1 space-x-1">
                        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    </div>
                    {/* Fullscreen, zoom controls */}
                    <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    <div className="h-8 w-14 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    {/* Frames button */}
                    <div className="flex items-center border-l pl-1">
                        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};