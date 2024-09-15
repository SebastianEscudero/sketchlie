import { HeartIcon } from 'lucide-react';

export const EmptyFavorites = () => {
    return (
        <div className='h-full flex flex-col items-center justify-center py-[10%]'>
            <HeartIcon className="w-12 h-12 text-gray-400 mb-2" />
            <h2 className='text-2xl font-semibold mt-6'>
                No favorite boards yet
            </h2>
            <p className='text-muted-foreground text-sm mt-2'>
                As you favorite boards, they will appear here!
            </p>
        </div>
    )
}