import { Box, Typography, Divider } from "@mui/material";
import InfoButton from "./components/InfoButton";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import TerminalButton from "./components/TerminalButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

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

      let responseText: string | null = null;
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        responseText = `Error ${res.status}: ${text}`;
        console.error("Processing failed:", res.status, text);
      } else {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json().catch(() => null);
          try {
            responseText = data
              ? JSON.stringify(data, null, 2)
              : "(empty JSON response)";
          } catch (e) {
            responseText = String(data);
          }
          console.log("Processing result:", data);
        } else {
          const text = await res.text().catch(() => "");
          responseText = text;
          console.log("Processing result (text):", text);
        }
      }

      setResponse(responseText);
      setScanDone(true);
    } catch (err) {
      console.error("handleScan failed", err);
    } finally {
      setLoading(false);
    }
  };

  const openInNewTab = () => {
    const content = response ?? "No response returned from the backend.";
    const encodedContent = encodeURIComponent(content);
    const resultsUrl = `${window.location.origin}/results.html?content=${encodedContent}`;
    window.open(resultsUrl, "_blank");
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
        {scanDone ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontFamily="JetBrains Mono"
                letterSpacing="0.1em"
                color="#7CFFB2"
                variant="h6"
              >
                Scan Finished
              </Typography>
              <InfoButton />
            </Box>

            <Divider sx={{ my: 2, borderColor: "#7CFFB2" }} />
            <Typography
              sx={{ fontFamily: "JetBrains Mono", color: "#7CFFB2", mb: 2 }}
            ></Typography>

            <TerminalButton
              label="/Open in new tab >_"
              icon={<ArrowForwardIosIcon sx={{ mr: 1, color: "#7CFFB2" }} />}
              onClick={openInNewTab}
            />
            <Divider sx={{ my: 3, borderColor: "#7CFFB2" }} />
            <TerminalButton
              label="/Back >_"
              icon={<ArrowBackIosNewIcon sx={{ mr: 1, color: "#7CFFB2" }} />}
              onClick={() => setScanDone(false)}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
