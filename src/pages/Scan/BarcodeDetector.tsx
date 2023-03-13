import { useEffect, useRef } from 'react';

const size = { width: '100%', height: '500px' };

interface BarcodeDetectorProps {
  onDetect: (barcode: string) => void;
  onError: (error: boolean) => void;
  canvasSize?: { width: string; height: string };
}

const BarcodeDetector = ({ canvasSize = size, onDetect, onError }: BarcodeDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const detectBarcode = async () => {
      const video = videoRef.current ?? false;
      const canvas = canvasRef.current ?? false;
      if (video && canvas) {
        const ctx = canvas.getContext('2d');
        const constraints = {
          video: { facingMode: 'environment' },
        };
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          video.srcObject = stream;
          video.setAttribute('playsinline', true.toString());
          video.play();
        } catch (err) {
          console.error('Error opening video stream:', err);
          return;
        }

        const detector = new (window as any).BarcodeDetector({
          formats: ['ean_13'],
        });

        const detect = async () => {
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          if (video?.readyState === video?.HAVE_ENOUGH_DATA) {
            const barcodes = await detector.detect(video);

            if (barcodes.length > 0) {
              onDetect(barcodes[0].rawValue);
            } else {
              requestAnimationFrame(detect);
            }
          } else {
            requestAnimationFrame(detect);
          }
        };

        requestAnimationFrame(detect);
      }
    };

    if ('BarcodeDetector' in window) {
      detectBarcode();
    } else {
      onError(true);
    }
  }, [onDetect, onError]);

  return (
    <div style={{ width: '95%', height: 'auto', margin: 0, padding: 20, boxSizing: 'border-box' }}>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay />
      <canvas ref={canvasRef} style={{ ...canvasSize }} />
    </div>
  );
};

export default BarcodeDetector;
