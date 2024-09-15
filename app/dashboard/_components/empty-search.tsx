import { Search } from 'lucide-react';

export const EmptySearch = () => {
    return (
        <div className='h-full flex flex-col items-center justify-center py-[10%]'>
            <Search className="w-12 h-12 text-gray-400 mb-2" />
            <h2 className='text-2xl font-semibold mt-6'>
                No results found
            </h2>
            <p className='text-muted-foreground textg-sm mt-2'>
                Are you sure you searched for the right board?
            </p>
        </div>
    )
}