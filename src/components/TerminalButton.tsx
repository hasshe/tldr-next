import { Button } from "@mui/material";
import type { ReactNode } from "react";

interface TerminalButtonProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export default function TerminalButton({
  label,
  icon,
  onClick,
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
        "&:hover": {
          backgroundColor: "rgba(124,255,178,0.1)",
          boxShadow: "0 0 10px rgba(124,255,178,0.4)",
        },
      }}
    >
      {icon}
      {label}
    </Button>
  );
}
