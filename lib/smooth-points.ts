export const smoothLastPoint = (points: [number, number, number][]): [number, number, number][] => {
    if (points.length < 3) return points;

    const smoothFactor = 0.314159;

    const lastIndex = points.length - 1;
    const penultimateIndex = lastIndex - 1;

    const prev = points[penultimateIndex - 1];
    const current = points[penultimateIndex];
    const next = points[lastIndex];

    points[penultimateIndex] = [
        current[0] + (prev[0] + next[0] - 2 * current[0]) * smoothFactor,
        current[1] + (prev[1] + next[1] - 2 * current[1]) * smoothFactor,
        current[2]
    ];

    return points;
};