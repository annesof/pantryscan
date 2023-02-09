import Quagga from '@ericblade/quagga2';
import { useCallback, useLayoutEffect } from 'react';

function getMedian(arr: any[]) {
  arr.sort((a: number, b: number) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes: any[]) {
  const errors = decodedCodes.filter((x) => x.error !== undefined).map((x) => x.error);
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}

const defaultConstraints = {
  width: 300,
  height: 480,
};

/*const defaultLocatorSettings = {
  patchSize: 'medium',
  halfSample: true,
};*/

const defaultDecoders = ['ean_8_reader', 'ean_reader', 'code_128_reader'];

export const Scan = ({
  onDetected,
  scannerRef,
  onScannerReady,
  cameraId,
  facingMode,
  constraints = defaultConstraints,
  //locator = defaultLocatorSettings,
  numOfWorkers = navigator.hardwareConcurrency || 0,
  decoders = defaultDecoders,
  locate = true,
}: {
  onDetected?: any;
  scannerRef: any;
  onScannerReady?: any;
  cameraId?: string;
  facingMode?: string;
  constraints?: object;
  locator?: object;
  numOfWorkers?: number;
  decoders?: any[];
  locate?: boolean;
}) => {
  const errorCheck = useCallback(
    (result: any) => {
      if (!onDetected) {
        return;
      }
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.25) {
        onDetected(result.codeResult.code);
      }
    },
    [onDetected],
  );

  const handleProcessed = (result: any) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    // const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = '24px Arial';
    drawingCtx.fillStyle = 'green';

    if (result) {
      // console.warn('* quagga onProcessed', result);
      /*if (result.boxes) {
        const width =
          drawingCanvas.getAttribute('width') !== null
            ? drawingCanvas.getAttribute('width')
            : undefined;
        const height =
          drawingCanvas.getAttribute('height') !== null
            ? drawingCanvas.getAttribute('height')
            : undefined;
        if (width && height) {
          drawingCtx.clearRect(0, 0, parseInt(width), parseInt(height));
        }
        result.boxes
          .filter((box: any) => box !== result.box)
          .forEach((box: any) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'purple',
              lineWidth: 2,
            });
          });
      }*/
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: 'blue',
          lineWidth: 2,
        });
      }
    }
  };

  useLayoutEffect(() => {
    if (navigator.mediaDevices) {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            constraints: {
              ...constraints,
              ...(cameraId && { deviceId: cameraId }),
              ...(!cameraId && { facingMode }),
            },
            target: scannerRef.current,
          },
          numOfWorkers,
          decoder: { readers: decoders },
          locate,
        },
        (err) => {
          Quagga.onProcessed(handleProcessed);

          if (err) {
            return console.log('Error starting Quagga:', err);
          }
          if (scannerRef && scannerRef.current) {
            Quagga.start();
            if (onScannerReady) {
              onScannerReady();
            }
          }
        },
      );
      Quagga.onDetected(errorCheck);
      return () => {
        Quagga.offDetected(errorCheck);
        Quagga.offProcessed(handleProcessed);
        Quagga.stop();
      };
    }
  }, [
    cameraId,
    onDetected,
    onScannerReady,
    scannerRef,
    errorCheck,
    constraints,
    decoders,
    locate,
    facingMode,
    numOfWorkers,
  ]);
  return null;
};
