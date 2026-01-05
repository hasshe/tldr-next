import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Tooltip } from "@mui/material";

export default function InfoButton() {
  return (
    <Tooltip title="Simple Scan Page for Summary and find similar sources." placement="bottom" arrow>
    <IconButton color="info" aria-label="info" style={{ position: 'absolute', top: 0, right: 10, paddingTop: '20px', backgroundColor: 'transparent' }}
    sx={{'&:focus': { outline: 'none' }}}>
        <InfoIcon />
    </IconButton>
    </Tooltip>
  );
}