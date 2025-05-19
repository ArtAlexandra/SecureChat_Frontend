'use client';

import Button from '@/shared/ui/Button';
import { Input } from 'antd';
import style from './WriteMessage.module.scss';
import { useEffect, useState } from 'react';
import Upload from '@/shared/ui/Upload';
interface IWriteMessageProps {
    userId: string;
    onSubmit: (message: string, file?: File) => void;
};

function WriteMessage({ userId, onSubmit }: IWriteMessageProps) {
    const [message, setMessage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        setMessage('');
        setFile(null);
    }, [userId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (file) onSubmit(message, file);
        if (!file) onSubmit(message);
        setMessage('');
        setFile(null);
    };

    return (
        <form className={style.writeMessage} onSubmit={handleSubmit}>
            <Input value={message} placeholder="Введите сообщение..." onChange={(e) => setMessage(e.target.value)} className={style.writeMessage__input} />
            <Upload onChange={(file: File | null) => setFile(file)} text="файл" value={file} />
            <Button type="submit" className={style.writeMessage__button}>Отправить</Button>
        </form>
    );
}

export default WriteMessage;