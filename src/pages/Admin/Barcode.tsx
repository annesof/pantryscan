import JsBarcode from 'jsbarcode';
import { useEffect, useRef } from 'react';

export const Barcode = ({ value }: { value: string }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      JsBarcode(imgRef.current, value, {
        format: 'CODE128',
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 8,
      });
    }
  }, [value]);

  return <svg ref={imgRef} />;
};
