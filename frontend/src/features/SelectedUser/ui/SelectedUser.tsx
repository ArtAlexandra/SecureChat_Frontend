'use client';
import type { TMessage } from "@/shared/config/MessagesType";
import type { TUser } from "@/shared/config/TUser";
import Image from "next/image";
import style from './SelectedUser.module.scss';
import { useEffect, useState } from "react";
import WriteMessage from "./WriteMessage";
import clsx from "clsx";
import { getHoursMinutes } from "@/shared/helpers/Date";
import { sendMessage, selectUserById, getMessages } from "@/shared/api/chats";

interface ISelectedUseProps {
    userId: string;
    chatId: string;
};

function SelectedUser({ userId, chatId }: ISelectedUseProps) {
    const [user, setUser] = useState<TUser>();
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [id, setId] = useState<string>('');

    const handleSendMessage = async (message: string) => {
        if (!message) return;
        try {
            await sendMessage({ receiverId: userId, content: message, chatId });
            await loadMessages();
        }
        catch (error) {
            console.error(error)
        }
    };

    const loadMessages = async () => {
        try {
            const messages = await getMessages(chatId);
            setMessages(messages);
        } catch (error) {
            console.error('Ошибка загрузки сообщений:', error);
        }
    };

    useEffect(() => {
        if (!userId) return;
        const getData = async () => {
            loadMessages();
            setId(localStorage.getItem('userId') || '');
            const selectedUser = await selectUserById(userId);
            setUser(selectedUser);
        };
        getData();
    }, [userId]);

    return (
        <div className={style.selected}>
            <div className={style.selected__header}>
                <p>{user?.nik}</p>
            </div>

            <div className={style.selected__messagesContainer}>
                {messages.map((message, index) => (
                    <div
                        key={`mes_${index}`}
                        className={clsx(style.selected__message, {
                            [style.selected__message_right]: id === message.senderId
                        })}
                    >
                        {message.content}
                        {message.fileUrl && (
                            <Image
                                src={message.fileUrl}
                                loader={({ src }) => src}
                                alt="image_user"
                                width={300}
                                height={400}
                            />
                        )}
                        <p className={style.selected__message__timestamp}>
                            {getHoursMinutes(message.createdAt)}
                        </p>
                    </div>
                ))}
            </div>

            <WriteMessage onSubmit={handleSendMessage} />
        </div>
    );
}

export default SelectedUser;