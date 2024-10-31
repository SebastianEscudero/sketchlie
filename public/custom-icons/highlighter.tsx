import { FC } from 'react';

interface HighlighterIconProps {
    color?: string;
    className?: string;
}

interface HighlighterIconComponent extends FC<HighlighterIconProps> {
    getCursor: (color: string) => string;
}

const HighlighterIconBase: FC<HighlighterIconProps> = ({ color = 'currentColor', className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 11-6 6v3h9l3-3" fill={color}/>
        <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
    </svg>
);

export const HighlighterIcon = HighlighterIconBase as HighlighterIconComponent;

HighlighterIcon.getCursor = (color: string) => {
    const svgString = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="white" 
            stroke="currentColor"
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        >
            <path d="m9 11-6 6v3h9l3-3" fill="${color}"/>
            <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
};