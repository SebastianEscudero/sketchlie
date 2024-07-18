import { getSvgPathFromPoints } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

interface EraserTrailProps {
  mousePosition: { x: number; y: number };
  zoom: number;
}

const TrailLength = 150; // Time in milliseconds a trail segment remains visible
export const EraserTrail = ({ mousePosition, zoom }: EraserTrailProps) => {
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number, time: number }[]>([]);

  useEffect(() => {
    setTrailPositions(prevPositions => {
      const currentTime = Date.now();
      const newPositions = prevPositions.filter(position => currentTime - position.time < TrailLength);
      newPositions.unshift({ x: mousePosition.x, y: mousePosition.y, time: currentTime });
      return newPositions;
    });
  }, [mousePosition]);

  // Convert trailPositions to the format expected by getSvgPathFromPoints
  const points = trailPositions.map(pos => [pos.x, pos.y]);

  if (points.length < 3) {
    return;
  }

  // Generate the path data string using getSvgPathFromPoints
  const pathData = getSvgPathFromPoints(points);

  return (
    <path
      d={pathData}
      stroke="gray"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={8/zoom}
    />
  );
};