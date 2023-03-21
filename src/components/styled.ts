import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
  padding: '15px',
  paddingTop: 0,
  marginTop: '-20px',
});

const FullSizeDecenteredFlexBox = styled(CenteredFlexBox)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
  height: '100%',
  marginTop: '20px',
  padding: '15px',
}));

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, FullSizeDecenteredFlexBox };
