interface SelectionNetProps {
    origin: { x: number; y: number };
    current: { x: number; y: number };
    zoom: number;
}

export const SelectionNet = ({ origin, current, zoom }: SelectionNetProps) => {
    return (
        <rect
            style={{
                fill: 'rgba(59, 130, 246, 0.3)',
                stroke: '#3B82F6',
                strokeWidth: 1 / zoom,
            }}
            x={Math.min(origin.x, current.x)}
            y={Math.min(origin.y, current.y)}
            width={Math.abs(origin.x - current.x)}
            height={Math.abs(origin.y - current.y)}
        />
    );
};