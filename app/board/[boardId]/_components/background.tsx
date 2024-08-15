interface BackgroundProps {
    background: string;
    zoom: number;
    camera: { x: number; y: number };
    isDraggingOverCanvas: boolean;
}

export const Background = ({
    background,
    zoom,
    camera,
    isDraggingOverCanvas
}: BackgroundProps) => {
    return (
        <div
            className={`fixed inset-0 z-0 ${isDraggingOverCanvas ? 'bg-neutral-200 dark:bg-zinc-900 border border-custom-blue' : 'bg-[#F9FAFB] dark:bg-[#101011]'}`}
            style={{
                backgroundImage: (background === 'grid') ? `
            linear-gradient(0deg, ${document.documentElement.classList.contains("dark") ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px),
            linear-gradient(90deg, ${document.documentElement.classList.contains("dark") ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)
        ` : (background === 'line') ? `
            linear-gradient(0deg, ${document.documentElement.classList.contains("dark") ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)
        ` : 'none',
                backgroundSize: (background === 'grid' || background === 'line') ? `${65 * zoom}px ${65 * zoom}px` : undefined,
                backgroundPosition: (background === 'grid' || background === 'line') ? `${camera.x}px ${camera.y}px` : undefined,
            }}
        />
    )
}