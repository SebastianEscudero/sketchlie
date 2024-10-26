import { CanvasMode, CanvasState, VideoLayer } from "@/types/canvas";
import { useEffect, useState } from "react";

interface VideoProps {
  id: string;
  layer: VideoLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  focused?: boolean;
  zoom: number;
  camera: { x: number; y: number };
  svgRef: React.RefObject<SVGSVGElement>;
  canvasState: CanvasState;
}

export const InsertVideo = ({
  id,
  layer,
  onPointerDown,
  focused,
  zoom,
  camera,
  svgRef,
  canvasState,
}: VideoProps) => {
  const { x, y, width, height, src } = layer;
  const [transform, setTransform] = useState("");
  const [visibleControls, setVisibleControls] = useState(false);

  useEffect(() => {
    const updateTransform = () => {
      if (svgRef.current) {
        const svg = svgRef.current;
        const viewBox = svg.viewBox.baseVal;
        const svgWidth = svg.width.baseVal.value || svg.clientWidth;
        const svgHeight = svg.height.baseVal.value || svg.clientHeight;

        const scaleX = svgWidth / viewBox.width;
        const scaleY = svgHeight / viewBox.height;

        const transformedX = (x * zoom + camera.x) * scaleX;
        const transformedY = (y * zoom + camera.y) * scaleY;

        setTransform(`translate(${transformedX}px, ${transformedY}px) scale(${zoom})`);
      }
    };

    updateTransform();
    window.addEventListener('resize', updateTransform);
    return () => window.removeEventListener('resize', updateTransform);
  }, [x, y, zoom, camera, svgRef]);

  useEffect(() => {
    if (canvasState.mode !== CanvasMode.None) setVisibleControls(false);
  }, [canvasState.mode]);

  useEffect(() => {
    if (!focused) setVisibleControls(false);
  }, [focused]);
  return (
    <div
      className="absolute"
      style={{
        transform,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'top left',
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
      onPointerUp={(e) => setVisibleControls(true)}
    >
      <video
        className="h-full w-full"
        autoPlay
        loop
        playsInline
        controls={visibleControls}
        src={src}
        onBlur={() => setVisibleControls(false)}
        style={{
          pointerEvents: visibleControls ? 'auto' : 'none',
        }}
      />
    </div>
  );
};