import { useRef } from 'react';
import Pdf from 'react-to-pdf';

import { Barcode } from './Barcode';
import './styles.css';
interface Row {
  ean: string;
  name: string;
  imageSmallUrl: string;
}

interface Props {
  rows: Row[];
}

export const Wheel = ({ rows }: Props) => {
  const ref = useRef(null);
  const rowsSliced = rows.slice(0, 10);
  return (
    <div>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }: { toPdf: any }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>

      <div className="container" ref={ref}>
        <div className="pie-chart">
          {rowsSliced.map((row, index) => {
            return (
              <div
                key={row.ean}
                className="pie-chart__slice"
                style={{ transformOrigin: 'center center', transform: `rotate(${index * 36}deg)` }}
              >
                <div className="pie-chart__label">
                  <Barcode value={row.ean} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
