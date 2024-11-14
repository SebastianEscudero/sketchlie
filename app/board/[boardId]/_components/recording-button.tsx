import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Video, Square, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCamera } from './hooks/use-camera';
import { useZoom } from './hooks/use-zoom';
import { getCenterOfScreen } from '@/lib/utils';
import { LayerType, Point } from '@/types/canvas';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface RecordingButtonProps {
    insertMedia: (mediaItems: { layerType: LayerType.Image | LayerType.Video | LayerType.Link | LayerType.Svg, position: Point, info: any, zoom?: number }[]) => void;
    userId: string;
}

export const RecordingButton = ({ insertMedia, userId }: RecordingButtonProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const chunksRef = useRef<Blob[]>([]);
    const centerPointRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const dimensionsRef = useRef<{ width: number, height: number }>({ width: 0, height: 0 });
    const [countdown, setCountdown] = useState<number | null>(null);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (isRecording) {
            interval = setInterval(() => {
                setDuration(d => d + 1);
            }, 1000);
        } else {
            setDuration(0);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleUpload = useCallback(async () => {
        setShowPreview(false);
        setIsUploading(true);

        try {
            let videoUrl = previewUrl;

            const response = await fetch(previewUrl!);
            const blob = await response.blob();

            // Log file size in MB
            const fileSizeInMb = blob.size / (1024 * 1024);
            console.log('File size:', fileSizeInMb.toFixed(2), 'MB');

            if (process.env.NODE_ENV !== 'development') {
                const response = await fetch(previewUrl!);
                const blob = await response.blob();
                const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'video/webm' });
                
                const formData = new FormData();
                formData.append('file', file);
                formData.append('userId', userId);
                formData.append('fileType', 'video');

                const response2 = await fetch('/api/aws-s3-images', {
                    method: 'POST',
                    body: formData,
                });

                if (!response2.ok) throw new Error('Upload failed');

                const urls = await response.json();
                videoUrl = urls[0];
            }

            insertMedia([{
                layerType: LayerType.Video,
                position: {
                    x: centerPointRef.current.x - dimensionsRef.current.width / 2,
                    y: centerPointRef.current.y - dimensionsRef.current.height / 2
                },
                info: { 
                    url: videoUrl, 
                    dimensions: dimensionsRef.current 
                },
            }]);

            toast.success(process.env.NODE_ENV === 'development' 
                ? 'Recording preview ready' 
                : 'Recording uploaded successfully'
            );
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload recording');
        } finally {
            setIsUploading(false);
            chunksRef.current = [];
        }
    }, [userId, insertMedia, previewUrl]);

    const handleCancel = () => {
        setShowPreview(false);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        chunksRef.current = [];
    };

    const startRecording = useCallback(async () => {
        try {
            chunksRef.current = [];
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    displaySurface: "browser",
                    frameRate: 24,
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                    channelCount: 1,
                },
                // @ts-ignore
                preferCurrentTab: true,
            });

            setCountdown(3);
            for(let i = 3; i > 0; i--) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setCountdown(i - 1);
            }
            setCountdown(null);

            // make sure the countdown is done before starting the recorder
            await new Promise(resolve => setTimeout(resolve, 50));

            const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
                ? 'video/webm;codecs=vp9,opus'
                : 'video/webm;codecs=vp8,opus';

            const recorder = new MediaRecorder(stream, {
                mimeType,
                videoBitsPerSecond: 500000,
                audioBitsPerSecond: 32000
            });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            recorder.onstop = async () => {
                dimensionsRef.current = {
                    width: window.innerWidth / 2,
                    height: window.innerHeight / 2
                };

                setIsRecording(false);
                
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
                setShowPreview(true);
            };

            recorder.start(2000);
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (error) {
            setCountdown(null);
            console.error('Recording error:', error);
            toast.error('Failed to start recording');
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            const currentCamera = useCamera.getState().camera;
            const currentZoom = useZoom.getState().zoom;
            
            centerPointRef.current = getCenterOfScreen(currentCamera, currentZoom);
            
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    }, [mediaRecorder]);

    return (
        <>
            <div className="flex items-center justify-center">
                <Button
                    variant="icon"
                    size="icon"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : isRecording ? (
                        <Square className="h-6 w-6 text-red-500" />
                    ) : (
                        <Video className="h-6 w-6" />
                    )}
                </Button>
                {isRecording && (
                    <div className="text-black dark:text-white px-2 py-1 rounded-md text-sm font-medium">
                        {formatTime(duration)}
                    </div>
                )}
            </div>

            {countdown !== null && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 text-white rounded-full w-24 h-24 
                                  flex items-center justify-center text-4xl font-bold">
                        {countdown}
                    </div>
                </div>
            )}

            <Dialog open={showPreview} onOpenChange={(open) => !open && handleCancel()}>
                <DialogContent className="max-w-4xl w-[90%]">
                    <DialogHeader>
                        <DialogTitle>Preview Recording</DialogTitle>
                    </DialogHeader>
                    {previewUrl && (
                        <div className="aspect-video relative">
                            <video 
                                src={previewUrl} 
                                controls 
                                className="w-full rounded-md border"
                                autoPlay
                            />
                        </div>
                    )}
                    <DialogFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isUploading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="sketchlieBlue"
                            onClick={handleUpload}
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};