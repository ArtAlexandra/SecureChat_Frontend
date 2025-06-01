import { useId } from 'react';
import clsx from 'clsx';

import style from './Input.module.scss';

type TInputType = 'text' | 'number' | 'email';

interface IInputProps {
    placeholder?: string;
    type?: TInputType;
    className?: string;
    disabled?: boolean;
    value?: string | number | undefined;
    label?: string;
    required?: boolean;
    name?: string;
    defaultValue?: string | number;
    caption?: string;
    autoComplete?: string;
    readOnly?: boolean;

    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ type = 'text', className, placeholder, label, autoComplete, disabled, value, name, defaultValue, caption, readOnly, onChange, onBlur }: IInputProps) {
    const autoCapitalize = type === 'email' ? 'off' : 'none';
    const inputId = useId();
    const inputFieldClassName = clsx(style.input__field, {
        [style.input__field_disabled]: disabled,
        [style.input__field_readOnly]: readOnly,
    });

    return (
        <div className={clsx(style.input, className)}>
            {label && <p>{label}</p>}
            <div className={style.input__fieldContainer}>
                <input
                    id={inputId}
                    className={inputFieldClassName}
                    placeholder={placeholder}
                    disabled={disabled}
                    type={type}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    value={value}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    readOnly={readOnly}
                />
            </div>
            {caption && <span className={style.input__caption}>{caption}</span>}

        </div>
    );
}

export default Input;