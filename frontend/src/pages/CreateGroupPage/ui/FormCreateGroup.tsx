'use client';
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import style from './FormCreateGroup.module.scss';
import Upload from "@/shared/ui/Upload";
import { useState } from "react";
import ModalListUsers from "./ModalListUsers";
import type { TUser } from "@/shared/config/TUser";
import { createChat } from "@/shared/api/chats";

function FormCreateGroup() {
    const [file, setFile] = useState<File | null>(null);
    const [showModalListUsers, setShowModalListUsers] = useState<boolean>(false);
    const [nameChat, setNameChat] = useState<string>('');
    const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);

    const handleCreateChat = async () => {
        const usersId: string[] = selectedUsers.map(user => user._id);
        await createChat({ participantIds: usersId, isGroup: true, groupName: nameChat });
    };
    return (
        <div className={style.formCreate}>
            <ModalListUsers isOpen={showModalListUsers} onClose={() => setShowModalListUsers(false)} onSelect={(users) => setSelectedUsers(users)} />
            <div>
                <Input placeholder="Название группы" label="Название группы" value={nameChat} onChange={(e) => setNameChat(e.target.value)} />
                <Input placeholder="Через сколько будут удаляться сообщения?" label="Через сколько будут удаляться сообщения?" />
                <p>Загрузите фото чата</p>
                <Upload onChange={(file: File | null) => setFile(file)} text="файл" value={file} />
                <Button onClick={() => setShowModalListUsers(true)}>Добавить участников</Button>
                <Button onClick={handleCreateChat}>Создать</Button>
            </div>
        </div>
    );
}

export default FormCreateGroup;