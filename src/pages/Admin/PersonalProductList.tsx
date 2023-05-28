import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Barcode } from './Barcode';

interface PersonalProductListProps {
  rows: any[];
}

export const PersonalProductList = ({ rows }: PersonalProductListProps) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 290 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ean</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>photo</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.ean} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.ean}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <img src={row.imageSmallUrl} width="50px" />
              </TableCell>
              <TableCell>
                <Barcode value={row.ean} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
