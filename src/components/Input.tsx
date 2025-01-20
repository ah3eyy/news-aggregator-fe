import { forwardRef } from "react";

interface IProps {
    type: 'text' | 'number' | 'email' | 'password' | 'date',
    placeholder: string,
    onChange: (value: any) => void,
    label: string,
    value: any,
    name: string,
    hasError?: boolean,
    hasErrorMessage?: string,
    customStyle?: string,
    labelStyle?: string,
    inputStyle?: string,
    ref?: any,
    max?: number
    readonly?: boolean,
    required?: boolean
    onKeyUp?: (value: any) => void
}

const Input = forwardRef<HTMLInputElement, IProps>(({
                                                        label,
                                                        onChange,
                                                        placeholder,
                                                        type,
                                                        name,
                                                        value,
                                                        hasError,
                                                        hasErrorMessage,
                                                        customStyle,
                                                        max,
                                                        readonly,
                                                        labelStyle,
                                                        inputStyle,
                                                        required,
                                                        onKeyUp
                                                    }, ref) => {
    return (
        <>
            <div className={`flex flex-col w-[100%] ${inputStyle && inputStyle}`}>
                <label htmlFor={name} className={`text-[14px] font-[Inter] font-[500] text-[#101928] ${labelStyle && labelStyle}`}>{label}</label>
                <input readOnly={readonly} max={max} ref={ref} className={`font-[Inter] border-[#D0D5DD] rounded-[6px] p-[10px] bg-[#eef3f7] outline-none ${hasError && 'border-[red]'} ${customStyle}`}
                       name={name} defaultValue={value} type={type} placeholder={placeholder} onChange={onChange} required={required}
                       onKeyUp={(value) => onKeyUp && onKeyUp((value.target as any).value)} />
                {hasErrorMessage && <span className="text-[12px] font-[Inter] text-[red]">{hasErrorMessage}</span>}
            </div>
        </>
    );
});

export default Input;
