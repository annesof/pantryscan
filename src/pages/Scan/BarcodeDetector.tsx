import { useEffect, useRef } from 'react';

const size = { width: '100%', height: '300px' };

interface BarcodeDetectorProps {
  onDetect: (barcode: string) => void;
  onError: (error: boolean) => void;
  canvasSize?: { width: string; height: string };
}

export const BarcodeDetector = ({ canvasSize = size, onDetect, onError }: BarcodeDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const detectBarcode = async () => {
      const video = videoRef.current ?? false;
      const canvas = canvasRef.current ?? false;
      if (video && canvas) {
        // create a  drawing context
        const ctx = canvas.getContext('2d');
        const constraints = {
          video: { facingMode: 'environment' },
        };
        try {
          // open stream video
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          //Associate the video stream with the <video> element and starts to play
          video.srcObject = stream;
          video.setAttribute('playsinline', true.toString());
          video.play();
        } catch (err) {
          console.error('Error opening video stream:', err);
          return;
        }

        //Initializes a barcode detector
        const detector = new (window as any).BarcodeDetector({
          formats: ['ean_13', 'code_128','ean_8'],
        });

        //Defines a recursive function to detect barcodes
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
    <div style={{ width: '95%', height: '350px', margin: 0, padding: 20, boxSizing: 'border-box' }}>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay />
      <canvas ref={canvasRef} style={{ ...canvasSize }} />
    </div>
  );
};
