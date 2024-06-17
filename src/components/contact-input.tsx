import React from 'react';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";

interface InputFieldProps {
    id: string;
    label: string;
    variant: 'outlined' | 'filled' | 'standard';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, variant, value, onChange , ...rest}) => {
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
                id={id}
                name={id}
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
