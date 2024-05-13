// components/DropArea.tsx
import * as React from 'react';
import Box from '@mui/material/Box';

interface Props {
    onDrop: (files: FileList) => void;
}

const DropArea: React.FC<Props> = ({ onDrop }) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) {
            onDrop(files);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                border: '2px dashed #ccc',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div>
                <p>Drag & drop files here</p>
                <p>or</p>
                <input type="file" onChange={(e) => onDrop(e.target.files as FileList)} />
            </div>
        </Box>
    );
};

export default DropArea;