// components/TextArea.tsx
import * as React from 'react';
import TextField from '@mui/material/TextField';

interface Props {
    label?: string;
}

const TextArea: React.FC<Props> = ({ label = 'Talk to us' }) => {
    return (
        <TextField
            multiline
            rows={8}
            label={label}
            variant="outlined"
            fullWidth
        />
    );
}

export default TextArea;