import { useId } from "react";

export function Input({name, placeholder, value, onChange}){
    const id = useId()
    return(
        <input 
            type="text" 
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}