import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Barcode } from './Barcode';

interface PersonalProductListProps {
  rows: any[];
}

export const PersonalProductList = ({ rows }: PersonalProductListProps) => {
  const ref = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  return (
    <div>
      <button onClick={handlePrint}>Download PDF</button>
      <TableContainer component={Paper} sx={{ maxHeight: 290 }}>
        <Table
          sx={{ minWidth: 650, marginLeft: '20px' }}
          ref={ref}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ paddingTop: '50px' }}>Name</TableCell>
              <TableCell sx={{ paddingTop: '50px' }}>Photo</TableCell>
              <TableCell sx={{ paddingTop: '50px' }}>Code barre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.ean} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <img src={row.imageSmallUrl} width="70px" />
                </TableCell>
                <TableCell>
                  <Barcode value={row.ean} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
