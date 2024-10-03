interface BaselineIconProps {
    color?: string;
}

export const BaselineIcon: React.FC<BaselineIconProps> = ({ color = 'currentColor' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
    >
        <path d="M4 20h16" stroke={color} strokeWidth="4"/>
        <path d="m6 16 6-12 6 12"/>
        <path d="M8 12h8"/>
    </svg>
);