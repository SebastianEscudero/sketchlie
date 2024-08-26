import { MediaPreview } from './MediaPreview';
import { LayerPreview } from './layer-preview';
import { SelectionBox } from './selection-box';
import { CurrentPreviewLayer } from './current-preview-layer';
import { CurrentSuggestedLayer } from './current-suggested-layer';
import { ArrowConnectionOutlinePreview } from './arrow-connection-outline-preview';
import { EraserTrail } from './eraser-trail';
import { CursorsPresence } from './cursors-presence';
import { Path } from '../canvas-objects/path';
import { CanvasMode, CanvasState, LayerType, ArrowHandle, Point, XYWH, Side } from "@/types/canvas";
import { colorToCss } from '@/lib/utils';

interface CanvasContentProps {
  onWheel: React.WheelEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>;
  onPointerMove: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave: React.PointerEventHandler<HTMLDivElement>;
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp: React.PointerEventHandler<HTMLDivElement>;
  visibleLayers: string[];
  liveLayers: any;
  selectedLayersRef: React.RefObject<string[]>;
  zoom: number;
  camera: { x: number; y: number };
  canvasState: CanvasState;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  svgRef: React.RefObject<SVGSVGElement>;
  layerIdsToColorSelection: { [key: string]: string };
  setLiveLayers: (layers: any) => void;
  setLayerRef?: (ref: React.RefObject<any>) => void;
  socket: any;
  expired: boolean;
  boardId: string;
  forceLayerPreviewRender: boolean;
  isMoving: boolean;
  activeTouches: number;
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
  onArrowResizeHandlePointerDown: (handle: ArrowHandle, initialBounds: XYWH) => void;
  forceSelectionBoxRender: boolean;
  setCurrentPreviewLayer: (layer: any) => void;
  mousePosition: Point;
  setCanvasState: (state: CanvasState) => void;
  setStartPanPoint: (point: Point) => void;
  setArrowTypeInserting: (type: any) => void;
  currentPreviewLayer: any;
  suggestedLayers: any;
  erasePath:[number, number][];
  otherUsers: any[];
  pencilDraft: [number, number, number][];
  pathColor: { r: number; g: number; b: number; a: number };
  pathStrokeSize: number;
  justChanged: boolean;
}

export const CanvasContent: React.FC<CanvasContentProps> = ({
  onWheel,
  onDragOver,
  onDrop,
  onDragLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onPointerMove,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  visibleLayers,
  liveLayers,
  selectedLayersRef,
  zoom,
  camera,
  canvasState,
  onLayerPointerDown,
  svgRef,
  layerIdsToColorSelection,
  setLiveLayers,
  setLayerRef,
  socket,
  expired,
  boardId,
  forceLayerPreviewRender,
  isMoving,
  activeTouches,
  onResizeHandlePointerDown,
  onArrowResizeHandlePointerDown,
  forceSelectionBoxRender,
  setCurrentPreviewLayer,
  mousePosition,
  setCanvasState,
  setStartPanPoint,
  setArrowTypeInserting,
  currentPreviewLayer,
  suggestedLayers,
  erasePath,
  otherUsers,
  pencilDraft,
  pathColor,
  pathStrokeSize,
  justChanged
}) => (
  <div
    className="z-10 absolute"
    onWheel={onWheel}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onDragLeave={onDragLeave}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
    onPointerMove={onPointerMove}
    onPointerLeave={onPointerLeave}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
  >
    <div className="z-10">
      {visibleLayers.map((layerId: string) => {
        const layer = liveLayers[layerId];
        if (layer && (layer.type === LayerType.Video || layer.type === LayerType.Link)) {
          return (
            <MediaPreview
              key={layerId}
              id={layerId}
              layer={layer}
              onPointerDown={onLayerPointerDown}
              focused={selectedLayersRef.current?.includes(layerId) || false}
              zoom={zoom}
              camera={camera}
              canvasState={canvasState}
            />
          );
        }
      })}
    </div>
    <div
      id="canvas"
      className="z-20 absolute"
      style={{ position: 'relative', pointerEvents: 'none' }}
    >
      <svg
        ref={svgRef}
        className="h-[100vh] w-[100vw]"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
            willChange: 'transform',
          }}
        >
          {visibleLayers.map((layerId: string) => {
            const isFocused = selectedLayersRef.current?.length === 1 && selectedLayersRef.current[0] === layerId && !justChanged;
            let layer = liveLayers[layerId];
            return (
              <LayerPreview
                key={layerId}
                id={layerId}
                layer={layer}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={layerIdsToColorSelection[layerId]}
                focused={isFocused}
                setLiveLayers={setLiveLayers}
                onRefChange={setLayerRef}
                socket={socket}
                expired={expired}
                boardId={boardId}
                forcedRender={forceLayerPreviewRender}
              />
            );
          })}
          {!isMoving && activeTouches < 2 && canvasState.mode !== CanvasMode.ArrowResizeHandler && (
            <SelectionBox
              zoom={zoom}
              liveLayers={liveLayers}
              selectedLayers={selectedLayersRef.current || []}
              onResizeHandlePointerDown={onResizeHandlePointerDown}
              onArrowResizeHandlePointerDown={onArrowResizeHandlePointerDown}
              setLiveLayers={setLiveLayers}
              forceRender={forceSelectionBoxRender}
              setCurrentPreviewLayer={setCurrentPreviewLayer}
              mousePosition={mousePosition}
              setCanvasState={setCanvasState}
              setStartPanPoint={setStartPanPoint}
              setArrowTypeInserting={setArrowTypeInserting}
            />
          )}
          {currentPreviewLayer && (
            <CurrentPreviewLayer
              layer={currentPreviewLayer}
            />
          )}
          {suggestedLayers && (
            <CurrentSuggestedLayer
              layer={suggestedLayers}
            />
          )}
          {((canvasState.mode === CanvasMode.ArrowResizeHandler && selectedLayersRef.current?.length === 1) || (currentPreviewLayer?.type === LayerType.Arrow)) && (
            <ArrowConnectionOutlinePreview
              zoom={zoom}
              selectedArrow={currentPreviewLayer || (selectedLayersRef.current && liveLayers[selectedLayersRef.current[0]])}
              liveLayers={liveLayers}
              mousePosition={mousePosition}
              handle={canvasState.mode === CanvasMode.ArrowResizeHandler ? (canvasState as any).handle : ArrowHandle.end}
            />
          )}
          {(canvasState.mode === CanvasMode.Eraser) && erasePath.length > 0 && (
            <EraserTrail mousePosition={mousePosition} zoom={zoom} />
          )}
          {canvasState.mode === CanvasMode.SelectionNet && (canvasState as any).current != null && activeTouches < 2 && (
            <rect
              style={{
                fill: 'rgba(59, 130, 246, 0.3)',
                stroke: '#3B82F6',
                strokeWidth: 1 / zoom,
              }}
              x={Math.min((canvasState as any).origin.x, (canvasState as any).current.x)}
              y={Math.min((canvasState as any).origin.y, (canvasState as any).current.y)}
              width={Math.abs((canvasState as any).origin.x - (canvasState as any).current.x)}
              height={Math.abs((canvasState as any).origin.y - (canvasState as any).current.y)}
            />
          )}
          {otherUsers && <CursorsPresence otherUsers={otherUsers} zoom={zoom} />}
          {
            pencilDraft && !pencilDraft.some(array => array.some(isNaN)) && (
              <Path
                points={pencilDraft}
                fill={
                  canvasState.mode === CanvasMode.Laser
                    ? '#F35223'
                    : canvasState.mode === CanvasMode.Highlighter
                      ? colorToCss({ ...pathColor, a: 0.7 })
                      : colorToCss(pathColor)
                }
                x={0}
                y={0}
                strokeSize={
                  canvasState.mode === CanvasMode.Laser
                    ? 5 / zoom
                    : canvasState.mode === CanvasMode.Highlighter
                      ? 30 / zoom
                      : pathStrokeSize
                }
              />
            )
          }
        </g>
      </svg>
    </div>
  </div>
);