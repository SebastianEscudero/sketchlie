import Image from 'next/image';

interface RoomLoadingProps {
    label: string
}

export const RoomLoading = ({
    label
}: RoomLoadingProps) => {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center dark:bg-[#383838]'>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" width="180" height="180">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="25%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                </defs>
                <style>
                    {`
                    @keyframes drawLine {
                      0% { stroke-dashoffset: 200; }
                      100% { stroke-dashoffset: 0; }
                    }
                    .animated-path {
                      stroke-dasharray: 200;
                      animation: drawLine 3s ease-in-out infinite;
                    }
                    `}
                </style>

                <path className="animated-path" d="M30,15 Q50,15 60,35 T90,55 Q110,55 110,75" stroke="url(#gradient)" strokeWidth="7" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="15" r="5" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
                <circle cx="60" cy="35" r="5" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
                <circle cx="90" cy="55" r="5" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
                <circle cx="110" cy="75" r="5" fill="#ffffff" stroke="#2563EB" strokeWidth="2" />
            </svg>
            <h1 className="text-center text-lg font-semibold max-w-[80%] w-full h-[80px]">{label}</h1>
        </div>
    );
};