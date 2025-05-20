'use client';
import type { TMessage } from "@/shared/config/MessagesType";
import type { TUser } from "@/shared/config/TUser";
import Image from "next/image";
import style from './SelectedUser.module.scss';
import { useEffect, useState } from "react";
import WriteMessage from "./WriteMessage";
import clsx from "clsx";
import { getHoursMinutes } from "@/shared/helpers/Date";
import { sendMessage, selectUserById, getMessages, deleteMessage, deleteChat } from "@/shared/api/chats";
import ToolsMessage from "./ToolsMessage";
import Button from "@/shared/ui/Button";

interface ISelectedUseProps {
    userId: string;
    chatId: string;

    onUpdateList: () => void;
};

function SelectedUser({ userId, chatId, onUpdateList }: ISelectedUseProps) {
    const [user, setUser] = useState<TUser>();
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [id, setId] = useState<string>('');
    const [showToolsMessage, setShowToolsMessage] = useState<boolean>(false);
    const [messageId, setMessageId] = useState<string>('');

    const handleSendMessage = async (message: string, file?: File) => {
        if (!message) return;
        try {
            const formData = new FormData();
            formData.append('receiverId', userId);
            formData.append('content', message);
            formData.append('chatId', chatId);
            if (file) formData.append('file', file);
            await sendMessage(chatId, formData);
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

    const handleDeleteChat = async () => {
        await deleteChat(chatId);
        await onUpdateList();
    };

    const handleOpenTools = (id: string) => {
        if (showToolsMessage) {
            setShowToolsMessage(false);
        }
        else {
            setShowToolsMessage(true);
            setMessageId(id);
        }

    };
    
    return (
        <div className={style.selected}>
            <div className={style.selected__header}>
                {user && <Image src={user?.image || '/avatarUsers/defaultLogo.jpg'} loader={({ src }) => src} width={50} height={50} alt={`avatar_${user?.nik}`} />}
                <p>{user?.nik}</p>
                <Button color="error" onClick={handleDeleteChat} className="absolute right-80">Удалить чат</Button>
            </div>

            <div className={style.selected__messagesContainer}>
                {messages.map((message, index) => (

                    <div
                        key={`mes_${index}`}
                        className={clsx(style.selected__message, {
                            [style.selected__message_right]: id === message.senderId
                        })}
                        onClick={() => handleOpenTools(message._id)}
                    >
                        <div className="mt-5 mb-3">
                            {showToolsMessage && messageId === message._id && message.receiverId === userId && <ToolsMessage onDelete={() => deleteMessage(message._id)} />}
                        </div>
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
            <WriteMessage onSubmit={handleSendMessage} userId={userId} />
        </div>
    );
}

export default SelectedUser;