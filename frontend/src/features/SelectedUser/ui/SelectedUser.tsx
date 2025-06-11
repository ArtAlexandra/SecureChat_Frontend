'use client';
import type { TMessage } from "@/shared/config/MessagesType";
import type { TUser } from "@/shared/config/TUser";
import Image from "next/image";
import style from './SelectedUser.module.scss';
import { useEffect, useState } from "react";
import WriteMessage from "./WriteMessage";
import clsx from "clsx";
import { getHoursMinutes } from "@/shared/helpers/Date";
import { sendMessage, getMessages, deleteMessage, deleteChat, getChatById } from "@/shared/api/chats";
import ToolsMessage from "./ToolsMessage";
import Button from "@/shared/ui/Button";
import { getMe } from "@/shared/api/user";
import { TInfoChat } from "@/shared/config/TInfoChat";
import { bigIntArrayToString, createUniqueKey, speckBlocksToString, SpeckCipher, stringToBigIntArray, stringToSpeckBlocks } from "@/entities/Speck";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/Routes";

interface ISelectedUseProps {
    chatId: string;

    onUpdateList: () => void;
};

function SelectedUser({ chatId, onUpdateList }: ISelectedUseProps) {
    const [speck, setSpeck] = useState<SpeckCipher | null>(null);
    const [user, setUser] = useState<TUser>();
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [showToolsMessage, setShowToolsMessage] = useState<boolean>(false);
    const [messageId, setMessageId] = useState<string>('');
    const [infoChat, setInfoChat] = useState<TInfoChat>();
    const router = useRouter();

    const encryptText = (text: string): string => {
        if (!speck) return '';
        const blocks = stringToSpeckBlocks(text);
        const encryptedBlock = speck.encryptBlock(blocks);
        const bigStr = bigIntArrayToString(encryptedBlock);
        return bigStr;
    };

    const handleSendMessage = async (message: string, file?: File) => {
        if (!message || !user || !speck) return;
        try {
            const secretMessage = encryptText(message);
            const formData = new FormData();
            formData.append('receiverId', user?._id);
            formData.append('content', secretMessage);
            formData.append('chatId', chatId);
            if (file) formData.append('file', file);
            await sendMessage(chatId, formData);
            await loadMessages();
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if (!speck) return;
        loadMessages();
    }, [speck]);

    const decryptText = (text: string): string => {
        if (!speck) return '';
        const strBig = stringToBigIntArray(text);
        const decryptedBlock = speck.decryptBlock(strBig);
        const content = speckBlocksToString(decryptedBlock);
        return content;
    };

    const loadMessages = async () => {
        if (!speck) return;
        try {
            const encryptedMessages = await getMessages(chatId);

            const decryptedMessages = encryptedMessages.map(msg => {
                try {
                    const decryptedMessage = decryptText(msg.content);
                    return {
                        ...msg,
                        content: decryptedMessage
                    };
                } catch (error) {
                    console.error('Ошибка декодирования сообщения:', msg._id, error);
                    return {
                        ...msg,
                        content: "[Невозможно расшифровать сообщение]"
                    };
                }
            });

            setMessages(decryptedMessages);
        } catch (error) {
            console.error('Ошибка загрузки сообщений:', error);
        }
    };

    useEffect(() => {
        if (!chatId) return;
        const getData = async () => {
            const data = await getMe();
            setUser(data);
            const chat = await getChatById(chatId);
            setInfoChat(chat);
            let createdKey: bigint[] = [];

            if (Array.isArray(chat.participants)) {
                const niks = chat.participants.map(user => user.nik);
                createdKey = createUniqueKey(data.nik, niks.join(','));
            }
            else if (typeof chat.participants === 'object' && 'nik' in chat.participants) {
                createdKey = createUniqueKey(data.nik, chat.participants[0]);
            }
            setSpeck(new SpeckCipher(createdKey))
        };

        getData();

    }, [chatId]);

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

    const handleDelete = (id: string) => {
        deleteMessage(id);
        loadMessages();
    };

    const handlePushChangeGroup = () => {
        if(!infoChat?._id) return;
        router.push(ROUTES.settings.changeGroup.generatePath(infoChat?._id))
    };

    return (
        <div className={style.selected}>
            <div className={style.selected__header}>
                {infoChat && <Image src={infoChat?.logo || '/avatarUsers/defaultLogo.jpg'} loader={({ src }) => src} width={50} height={50} alt={`avatar_${infoChat?.title}`} />}
                <p className="cursor-pointer" onClick={handlePushChangeGroup}>{infoChat?.title}</p>
                <Button color="error" onClick={handleDeleteChat} className="absolute right-4 sm:right-20 md:right-40 lg:right-60 xl:right-80">Удалить чат</Button>
            </div>

            <div className={style.selected__messagesContainer}>
                {messages.map((message, index) => (

                    <div
                        key={`mes_${index}`}
                        className={clsx(style.selected__message, {
                            [style.selected__message_right]: user?._id === message.senderId
                        })}
                        onClick={() => handleOpenTools(message._id)}
                    >
                        <div className="mt-5 mb-3">
                            {showToolsMessage && user && messageId === message._id && message.receiverId !== user?._id && <ToolsMessage onDelete={() => handleDelete(message._id)} />}
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
            {user && <WriteMessage onSubmit={handleSendMessage} userId={user?._id} />}
        </div>
    );
}

export default SelectedUser;