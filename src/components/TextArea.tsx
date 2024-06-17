import React from "react";
import { TextField } from "@mui/material";

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  onChange,
  style,
}) => {
  return (
    <TextField
      id={name}
      name={name}
      label="Message"
      variant="outlined"
      multiline
      rows={8}
      value={value}
      onChange={onChange}
      fullWidth
      style={style}
    />
  );
};

export default TextArea;
