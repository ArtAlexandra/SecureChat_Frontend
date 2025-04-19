import style from './Button.module.scss';
import clsx from 'clsx';

type TButtonType = 'reset' | 'submit';

interface IButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: TButtonType;
    className?: string;
};

function Button({children, onClick, type, className}: IButtonProps) {
    return <button onClick={onClick} type={type} className={clsx(style.button, className)}>{children}</button>;
}

export default Button;