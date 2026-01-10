import { Box, Typography, Divider } from "@mui/material";
import InfoButton from "./components/InfoButton";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import TerminalButton from "./components/TerminalButton";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);

  const getActiveTabUrl = (): Promise<string | undefined> => {
    return new Promise((resolve) => {
      try {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          resolve(tabs?.[0]?.url);
        });
      } catch (err) {
        console.error("chrome.tabs.query failed", err);
        resolve(undefined);
      }
    });
  };

  const handleScan = async () => {
    setLoading(true);
    try {
      const url = await getActiveTabUrl();
      if (!url) {
        console.warn("No active tab URL available to process");
        return;
      }

      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiBase}/process-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Processing failed:", res.status, text);
      } else {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          console.log("Processing result:", data);
        } else {
          const text = await res.text().catch(() => "");
          console.log("Processing result (text):", text);
        }
      }
    } catch (err) {
      console.error("handleScan failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousScans = async () => {
    setLoadingPrev(true);
    try {
      console.log("Listing previous scans...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // TODO: show previous scans in a modal
    } finally {
      setLoadingPrev(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Box
        sx={{
          width: 360,
          border: "1px solid #7CFFB2",
          borderRadius: 2,
          padding: 2,
          boxShadow: "0 0 12px rgba(124,255,178,0.3)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            fontWeight="bold"
            fontFamily="JetBrains Mono"
            letterSpacing="0.1em"
            color="#7CFFB2"
            variant="h6"
          >
            TL;DR Next
          </Typography>
          <InfoButton />
        </Box>

        <Divider sx={{ my: 2, borderColor: "#7CFFB2" }} />

        <TerminalButton
          label="/Scan >_"
          icon={<SearchIcon sx={{ mr: 1, color: "#7CFFB2" }} />}
          onClick={handleScan}
          loading={loading}
        />
        <Divider sx={{ my: 3, borderColor: "#7CFFB2" }} />

        <TerminalButton
          label="/Previous Scans >_"
          icon={<FolderIcon sx={{ mr: 1, color: "#7CFFB2" }} />}
          onClick={handlePreviousScans}
          loading={loadingPrev}
        />
      </Box>
    </Box>
  );
}

export default App;
