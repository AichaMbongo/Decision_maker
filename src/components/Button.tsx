import React, {ReactNode}  from 'react';
import  IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import { borderRadius } from '@mui/system';

interface CustomButtonProps{
    onClick: () => void;
    children: ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?:boolean; //disabled prop
    width?: string | number; // Add the new width property
    marginTop?: string | number;
    variant?: 'text' | 'outlined' | 'contained';
    borderRadius?: string | number;
}

const CustomButton =({onClick, children, startIcon, endIcon, disabled, width, variant, borderRadius }: CustomButtonProps) => {

    return(
        <Button

            variant={variant || "contained"} 
            onClick={onClick}
            className='custom-button'
            disabled={disabled}
            sx={{
                width: width ?? '50%', // Use the width prop or default to 100%
                borderRadius: borderRadius ?? '16px',
            }}
        >
            {startIcon && (
                <IconButton>
                    {startIcon}
                </IconButton>
            )}

            <Typography>{children}</Typography>

            {endIcon && (
                <IconButton>
                    {endIcon}
                </IconButton>
            )}
        </Button>
    );
};

export default CustomButton;




// BELOW IS HOW TO IMPLEMENT THE DIFFERENT BUTTONS:

//  {/* Enabled button with startIcon */}
//  <CustomButton onClick={handleClick} startIcon={<PersonOutlineSharpIcon />}>
//         Enabled Button with Start Icon
//       </CustomButton>
      
//       {/* Enabled button with endIcon */}
//       <CustomButton onClick={handleClick} endIcon={<PersonOutlineSharpIcon />}>
//         Enabled Button with End Icon
//       </CustomButton>
      
//       {/* Disabled button with both startIcon and endIcon */}
//       <CustomButton onClick={handleClick} startIcon={<PersonOutlineSharpIcon />} endIcon={<PersonOutlineSharpIcon />} disabled={true}>
//         Disabled Button with Start and End Icon
//       </CustomButton>
      
//       {/* Enabled button without any icon */}
//       <CustomButton onClick={handleClick}>
//         Enabled Button without Icon
//       </CustomButton>
      
//       {/* Disabled button without any icon */}
//       <CustomButton onClick={handleClick} disabled={true}>
//         Disabled Button without Icon
//       </CustomButton>  




