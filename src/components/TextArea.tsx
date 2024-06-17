
import React from 'react';
import { TextField, Box } from '@mui/material';


interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}


const TextArea: React.FC<TextAreaProps> = ({ name, value, onChange }) => {
    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 2, width: "55ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id={name}
                name={name}
                label="Message"
                variant="outlined"
                multiline
                rows={6}
                value={value}
                onChange={onChange}
                fullWidth
            />
        </Box>
    );

};

export default TextArea;
