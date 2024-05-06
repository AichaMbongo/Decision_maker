//input-field.tsk

import * as React from 'react';
import Box from '@mui/material/Box';
import  TextField  from '@mui/material/TextField';


interface Field {
    id: string;
    label: string;
    variant: 'outlined' | 'filled' | 'standard';
    defaultValue?: string;
}

interface Props {
    fields: Field[];
}


export default function BasicTextField({fields}: Props){
    return (
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '70ch'},
        }}
        noValidate
        autoComplete="off"
        >
            {fields.map((field) =>(
            <TextField
            key={field.id}
            id={field.id}
            label= {field.label}
            variant={field.variant}
            defaultValue={field.defaultValue}

            // the above are props that have been passed to the textfield component
            />
            ))}
        </Box>
    );
}

// How to use component in the main File

// import BasicTextFields from './BasicTextFields';

// export default function MyForm() {
//   const fields = [
    // { id: 'outlined-basic', label: 'Outlined', variant: 'outlined', defaultValue: '' },
    // { id: 'filled-basic', label: 'Filled', variant: 'filled', defaultValue: '' },
    // { id: 'standard-basic', label: 'Standard', variant: 'standard', defaultValue: '' },
//   ];

//   return <BasicTextField fields={fields} />;
// }
