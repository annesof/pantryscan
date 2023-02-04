import { Chip as ChipBase, ChipProps as ChipBaseProps } from '@mui/material';

interface ChipProps extends Omit<ChipBaseProps, 'color'> {
  color?: string;
}

export const Chip = ({ color, ...props }: ChipProps) => {
  return (
    <ChipBase
      sx={{
        backgroundColor: color || 'lightgrey',
        margin: '3px',
        height: '25px',
        fontSize: '0.85rem',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
      {...props}
    />
  );
};
