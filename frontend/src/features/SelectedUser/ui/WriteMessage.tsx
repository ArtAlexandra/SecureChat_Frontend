'use client';

import Button from '@/shared/ui/Button';
import { Input } from 'antd';
import style from './WriteMessage.module.scss';
import { useState } from 'react';

interface IWriteMessageProps {
    onSubmit: (e: string) => void;
};

function WriteMessage({ onSubmit }: IWriteMessageProps) {
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(message)
        setMessage('');
    };

    return (
        <form className={style.writeMessage} onSubmit={handleSubmit}>
            <Input value={message} placeholder="Введите сообщение..." onChange={(e) => setMessage(e.target.value)} className={style.writeMessage__input} />
            <Button type="submit" className={style.writeMessage__button}>Отправить</Button>
        </form>
    );
}

export default WriteMessage;