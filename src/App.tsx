
import { Typography } from '@mui/material';
import './App.css'
import InfoButton from './components/info-button'
import ScanButton from './components/scan-button'
import Divider from '@mui/material/Divider';

function App() {
  return (
    <div style={{ width: "100%"}}>
      <Typography variant="h6" style={{ position: 'absolute', top: 0, left: 0, padding: '15px' }} fontWeight="bold">
        TL;DR Next
      </Typography>
          <InfoButton />
      <Divider />
        <ScanButton />
    </div>
  )
}

// todo: add routing for info page
// todo: add state management for scan results and Y N buttons
export default App