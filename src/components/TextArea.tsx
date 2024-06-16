import React from 'react';
import { TextField } from '@mui/material';

interface TextAreaProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ name, value, onChange }) => {
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
        />
    );
};

export default TextArea;
