//input-field.tsk

import * as React from 'react';
import Box from '@mui/material/Box';
import  TextField  from '@mui/material/TextField';
import { Field } from './interfaces/InputFieldProps';
import { Props } from './interfaces/InputFieldProps';



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
// import Field from '../components/interfaces/InputFieldProps';


// export default function MyForm() {
//   const fields: Field[] = [
    // { id: 'outlined-basic', label: 'Outlined', variant: 'outlined', defaultValue: '' },
    // { id: 'filled-basic', label: 'Filled', variant: 'filled', defaultValue: '' },
    // { id: 'standard-basic', label: 'Standard', variant: 'standard', defaultValue: '' },
//   ];

//   return <BasicTextField fields={fields} />;
// }
