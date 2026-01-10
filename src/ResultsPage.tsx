import { Box, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [content, setContent] = useState<string>("Loading...");

  useEffect(() => {
    // Get the content from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const encodedContent = params.get("content");

    if (encodedContent) {
      try {
        const decodedContent = decodeURIComponent(encodedContent);
        setContent(decodedContent);
      } catch (e) {
        setContent("Error decoding content");
      }
    } else {
      setContent("No response returned from the backend.");
    }
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        color: "#e6fff0",
        fontFamily: "JetBrains Mono, monospace",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#021414",
          color: "#e6fff0",
          borderRadius: 1,
          border: "1px solid #7CFFB2",
          padding: 3,
          width: "95%",
          height: "88%",
          overflow: "auto",
          position: "relative",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        <IconButton
          onClick={() => window.close()}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#7CFFB2",
            "&:hover": {
              backgroundColor: "rgba(124, 255, 178, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            color: "#e6fff0",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            margin: 0,
            paddingRight: 4,
          }}
        >
          {content}
        </Typography>
      </Paper>
    </Box>
  );
}
