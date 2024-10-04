interface LineIconProps {
    isActive: boolean;
}

export const LineIcon: React.FC<LineIconProps> = ({ isActive }) => (
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={isActive ? 'blue' : 'currentColor'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
>
    <path d="M4 12h16" transform="translate(12, 12) rotate(-45) translate(-12, -12)"/>
</svg>
);