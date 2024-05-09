import React, {ReactNode}  from 'react';
import  IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import { borderRadius } from '@mui/system';
import CustomButtonProps from './interfaces/ButtonInterface';


const CustomButton =({onClick, children, startIcon, endIcon, disabled, width, variant, borderRadius }: CustomButtonProps) => {

    return(

        
        <Button

            variant={variant || "contained"} 
            onClick={onClick}
            className='custom-button'
            disabled={disabled}
            sx={{
                width: width ?? '100%', // Use the width prop or default to 100%
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




