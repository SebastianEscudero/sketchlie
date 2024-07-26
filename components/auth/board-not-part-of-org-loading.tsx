import Image from 'next/image';

interface NotPartOfOrgProps {
    label: string
}

export const NotPartOfOrg = ({
    label
}: NotPartOfOrgProps) => {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center dark:bg-[#383838]'>
            <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={120}
                className='animate-pulse duration-700'
                priority
            />
            <h1 className='text-2xl font-bold mt-4 dark:text-white text-center'>{label}</h1>
        </div>
    );
};