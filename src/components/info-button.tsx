import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from "@mui/material";

export default function InfoButton() {
  return (
    <IconButton color="info" aria-label="info" style={{ position: 'absolute', bottom: 0, left: 0, paddingBottom: '15px' }}
    sx={{'&:focus': { outline: 'none' }}}>
        <InfoIcon />
    </IconButton>
  );
}