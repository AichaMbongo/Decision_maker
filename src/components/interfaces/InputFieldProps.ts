export interface Field {
    id: string;
    label: string;
    variant: 'outlined' | 'filled' | 'standard';
    defaultValue?: string;
    value?: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Props {
    fields: Field[];
}
