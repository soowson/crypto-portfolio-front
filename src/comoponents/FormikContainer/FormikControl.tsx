import React from "react";
import {Input} from "./Input/Input";
import {Textarea} from "./Textarea/Textarea";
import {Select} from "./Select/Select";
import {SmallInput} from "./SmallInputs/SmallInput";
import {DateInput} from "./SmallInputs/Date";
import {TimeInput} from "./SmallInputs/TimeInput";

interface Props {
    control: string;
    name: string;
    type: string;
    label: string;
    value?: string | undefined;
    placeholder?: string | undefined;
    disabled?: string | undefined;
    rest?: any;
}

export const FormikControl = ({control, name, type, label, value, placeholder, disabled, ...rest}: Props) => {
    switch (control) {
        case 'input':
            return <Input label={label} name={name} type={type} disabled={disabled} rest={rest}/>
        case 'smallInput':
            return <SmallInput label={label} name={name} type={type} placeholder={placeholder} rest={rest}/>
        case 'textarea':
            return <Textarea label={label} name={name} type={type} placeholder={placeholder}/>
        case 'select':
            return <Select label={label} name={name} value={value}/>
        case 'date':
            return <DateInput label={label} name={name} type={type} value={value} placeholder={placeholder}/>
        case 'time':
            return <TimeInput label={label} name={name} type={type} placeholder={placeholder}/>
        default:
            return null
    }
};
