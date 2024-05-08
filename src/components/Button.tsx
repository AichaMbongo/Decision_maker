import React, {ReactNode}  from 'react';
import  Button  from "@mui/material/Button";
import  IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface CustomButtonProps{
    onClick: () => void;
    children: ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?:boolean; //disabled prop
}


//declare constant 'button' which represents our button component
const CustomButton =({onClick, children, startIcon, endIcon, disabled }: CustomButtonProps) =>{

    return(
        <Button variant="contained" onClick={onClick}  className='custom-button' disabled={disabled}>
           
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

export default CustomButton;



