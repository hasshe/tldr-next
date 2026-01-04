import { Button } from "@mui/material";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from "react";

export default function ScanButton() {
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div style={{ position: "relative" }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Button 
          variant="contained" 
          style={{ backgroundColor: "green" }}
          onClick={() => {
            setLoading(true);
            console.log("Scan button clicked!");
          }}
        >
          <ScreenSearchDesktopIcon style={{ paddingRight: "10px" }} /> Summarize
        </Button>
      )}
    </div>
  );
}