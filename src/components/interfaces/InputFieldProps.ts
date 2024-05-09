export interface Field {
    id: string;
    label: string;
    variant: 'outlined' | 'filled' | 'standard';
    defaultValue?: string;
}

export interface Props {
    fields: Field[];
}
