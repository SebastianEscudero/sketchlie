interface BackgroundProps {
    background: string;
    zoom: number;
    camera: { x: number; y: number };
}

export const Background = ({
    background,
    zoom,
    camera,
}: BackgroundProps) => {
    const showGrid = zoom >= 0.6;
    const isDark = document.documentElement.classList.contains("dark");
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const dotColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
    const baseDotSize = 1;
    const adjustedDotSize = Math.max(1, baseDotSize * zoom ** (1 / 2));

    const getBackgroundImage = () => {
        if (!showGrid) return 'none';

        switch (background) {
            case 'grid':
                return `
                    linear-gradient(0deg, ${gridColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
                `;
            case 'circular-grid':
                return `radial-gradient(circle at center, ${dotColor} ${adjustedDotSize}px, transparent ${adjustedDotSize}px)`;
            default:
                return 'none';
        }
    };

    const getBackgroundSize = () => {
        if (!showGrid) return 'none';
        return background === 'circular-grid' ? `${25 * zoom}px ${25 * zoom}px` : `${65 * zoom}px ${65 * zoom}px`;
    };

    return (
        <div
            className={`absolute inset-0 bg-[#F9FAFB] dark:bg-[#101011]`}
            style={{
                backgroundImage: getBackgroundImage(),
                backgroundSize: getBackgroundSize(),
                backgroundPosition: `${camera.x}px ${camera.y}px`,
            }}
        />
    )
}
