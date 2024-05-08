import { ReactNode } from "react";
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

export default CustomButtonProps