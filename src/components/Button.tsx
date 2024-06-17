// components/CustomButton.tsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomButtonProps from "./interfaces/ButtonInterface";

const CustomButton = ({
  onClick,
  children,
  startIcon,
  endIcon,
  disabled,
  variant,
  borderRadius,
  style,
  ...rest
}: CustomButtonProps) => {
  return (
    <Button
      variant={variant || "contained"}
      onClick={onClick}
      className="custom-button"
      disabled={disabled}
      sx={{
        borderRadius: borderRadius || "16px",
        paddingRight: 2,
        paddingLeft: 2,
        marginBottom: 2,
        minWidth: "200px",
        ...style, // Apply inline styles here
      }}
      {...rest}
    >
      {startIcon && <IconButton>{startIcon}</IconButton>}
      <Typography>{children}</Typography>
      {endIcon && <IconButton>{endIcon}</IconButton>}
    </Button>
  );
};

export default CustomButton;
