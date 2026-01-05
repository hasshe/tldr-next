import { Box, Typography, Divider } from "@mui/material";
import InfoButton from "./components/InfoButton";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import TerminalButton from "./components/TerminalButton";

function App() {
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
          label="Scan_"
          icon={<SearchIcon sx={{ mr: 1, color: "#7CFFB2" }} />}
          onClick={() => console.log("Hello World")} // TODO: get active tab URL and start a spinner. Send URL to BE and wair for response.
        />
        <Divider sx={{ my: 3, borderColor: "#7CFFB2" }} />

        <TerminalButton
          label="Previous Scans_"
          icon={<FolderIcon sx={{ mr: 1, color: "#7CFFB2" }} />}
          onClick={() => console.log("Hello World 2")} // TODO: List previous scans in a new window or popup
        />
      </Box>
    </Box>
  );
}

export default App;
