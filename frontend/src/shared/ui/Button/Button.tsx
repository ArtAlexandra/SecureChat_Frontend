import style from './Button.module.scss';
import clsx from 'clsx';

type TButtonType = 'reset' | 'submit';
type TButtonColor = 'basic' | 'error';

interface IButtonProps {
    children: React.ReactNode;
    type?: TButtonType;
    color?: TButtonColor;
    className?: string;

    onClick?: () => void;
};

function Button({children, onClick, type, className, color = 'basic'}: IButtonProps) {
    return <button onClick={onClick} type={type} className={clsx(style.button, className, style[`button_${color}`])}>{children}</button>;
}

export default Button;