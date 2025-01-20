import { LoadingOutlined } from '@ant-design/icons';
import { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string,
    onSubmit?: () => void,
    loading: boolean,
    disabled: boolean,
    customStyle?: string,
}

export default function Button({ label, onSubmit, loading, disabled, customStyle, type }: IProps) {

    return (
        <>
            <button disabled={disabled}
                    className={`
                        bg-primary disabled:bg-[#D0D5DD] 
                        disabled:text-[#FFFFFF] w-[100%] rounded-[8px] !h-[50px] text-[white] 
                        text-[16px] font-[inter] text-center font-[600] ${customStyle}
                    `}
                    onClick={onSubmit}
                    type={type}>
                {loading ? <LoadingOutlined /> : label}
            </button>
        </>
    );
}
