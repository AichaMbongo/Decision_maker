// input-field.tsx

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Props } from "./interfaces/InputFieldProps";

const BasicTextField: React.FC<Props> = ({ fields }) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      {fields.map((field) => (
        <TextField
          key={field.id}
          id={field.id}
          label={field.label}
          variant={field.variant}
          defaultValue={field.defaultValue}
          onChange={field.onChange}
          value={field.value}
          name={field.name}
          fullWidth
          margin="normal"
        />
      ))}
    </Box>
  );
};

export default BasicTextField;
