interface ExportIconProps {
    color?: string;
}

export const ExportIcon: React.FC<ExportIconProps> = ({ color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 9 12 4 17 9" />
        <line x1="12" x2="12" y1="4" y2="16" />
    </svg>
);