import React from "react";
import { Button } from "@mui/material";

const ButtonComponent = ({
  label = "Click Me",
  onClick,
  sx = {},
  variant = "contained",
  color = "#000",
  hoverColor = "#555555",
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: color,
        color: "#ccc",
        textTransform: "uppercase",
        fontWeight: "600",
        padding: "1rem 1.9rem",
        "&:hover": {
          backgroundColor: hoverColor,
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
