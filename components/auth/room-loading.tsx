import Image from 'next/image';

interface RoomLoadingProps {
    label: string
}

export const RoomLoading = ({
    label
}: RoomLoadingProps) => {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center dark:bg-[#383838]'>
            <Image 
                src="/logos/logo.svg" 
                alt="logo" 
                width={180} 
                height={180} 
                className="animate-pulse dark:hidden" 
            />
            <Image 
                src="/logos/logo-dark-mode.svg" 
                alt="logo" 
                width={180} 
                height={180} 
                className="animate-pulse hidden dark:block" 
            />
            <h1 className="text-center text-lg font-semibold max-w-[80%] w-full h-[80px]">{label}</h1>
        </div>
    );
};