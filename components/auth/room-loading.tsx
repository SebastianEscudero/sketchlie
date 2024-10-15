import Image from 'next/image';

interface RoomLoadingProps {
    label: string
}

export const RoomLoading = ({
    label
}: RoomLoadingProps) => {
    const isDarkMode = document.documentElement.classList.contains('dark');

    return (
        <div className='h-full w-full flex flex-col justify-center items-center dark:bg-[#383838]'>
            <Image src={isDarkMode ? "/logos/logo-dark-mode.svg" : "/logos/logo.svg"} alt="logo" width={180} height={180} className="animate-pulse" />
            <h1 className="text-center text-lg font-semibold max-w-[80%] w-full h-[80px]">{label}</h1>
        </div>
    );
};