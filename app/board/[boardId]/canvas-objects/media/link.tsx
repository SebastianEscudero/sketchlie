import { CanvasMode, CanvasState, LinkLayer } from "@/types/canvas";
import { useEffect, useState } from "react";

interface LinkProps {
  id: string;
  layer: LinkLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  focused?: boolean;
  zoom: number;
  camera: { x: number; y: number };
  canvasState: CanvasState;
  svgRef: React.RefObject<SVGSVGElement>;
}

export const InsertLink = ({
  id,
  layer,
  onPointerDown,
  zoom,
  camera,
  svgRef,
  canvasState,
  focused,
}: LinkProps) => {
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
      <iframe
        className="h-full w-full border border-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="Link"
        allowFullScreen
        src={src}
        onBlur={() => setVisibleControls(false)}
        style={{
          pointerEvents: visibleControls ? "auto" : "none",
        }}
      />
    </div>
  );
};