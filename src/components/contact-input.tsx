import React from 'react';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";

interface InputFieldProps {
    id: string;
    name: string; // Add the name prop
    label: string;
    variant: 'outlined' | 'filled' | 'standard';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, name, label, variant, value, onChange, ...rest }) => {
    return (
        <Box
            sx={{
                "& > :not(style)": { m: 2, width: "55ch" },
            }}
        >
            <TextField
                id={id}
                name={name} // Use the name prop here
                label={label}
                variant={variant}
                value={value}
                onChange={onChange}
                fullWidth
                {...rest}
            />
        </Box>
    );
};

export default InputField;
