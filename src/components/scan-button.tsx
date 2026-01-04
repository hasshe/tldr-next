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

  const handleScan = async () => {
    setLoading(true);
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentUrl = tabs[0]?.url;
      if (!currentUrl) {
        console.error("No active tab found");
        setLoading(false);
        return;
      }
      console.log("Current URL:", currentUrl);
    } catch (error) {
      console.error("Error getting current URL:", error);
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Button 
          variant="contained" 
          style={{ backgroundColor: "green" }}
          onClick={handleScan}
        >
          <ScreenSearchDesktopIcon style={{ paddingRight: "10px" }} /> Summarize
        </Button>
      )}
    </div>
  );
}