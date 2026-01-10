import { Button, CircularProgress } from "@mui/material";
import type { ReactNode } from "react";

interface TerminalButtonProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

export default function TerminalButton({
  label,
  icon,
  onClick,
  loading = false,
}: TerminalButtonProps) {
  return (
    <Button
      onClick={onClick}
      fullWidth
      sx={{
        color: "#7CFFB2",
        justifyContent: "flex-start",
        fontFamily: "JetBrains Mono",
        letterSpacing: "0.1em",
        paddingY: 1.5,
        display: "flex",
        alignItems: "center",
        "&:hover": {
          backgroundColor: "rgba(124,255,178,0.1)",
          boxShadow: "0 0 10px rgba(124,255,178,0.4)",
        },
      }}
    >
      {icon}
      {label}
      {loading && (
        <CircularProgress
          size={18}
          thickness={4}
          sx={{ ml: "auto", color: "#7CFFB2" }}
        />
      )}
    </Button>
  );
}
