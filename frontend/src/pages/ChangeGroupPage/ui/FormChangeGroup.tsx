import { TInfoChat } from "@/shared/config/TInfoChat";
import { TUser } from "@/shared/config/TUser";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Upload from "@/shared/ui/Upload";
import Image from 'next/image';
import { useState } from "react";
import style from './FormChangeGroup.module.scss';
import ModalListUsers from "./ModalListUsers";

interface IFormCreateGroupProps {
    chatInfo: TInfoChat;

    onSave: (participantIds: string[], title: string, file: File | null, id: string) => void;
};

function FormChangeGroup({ chatInfo, onSave }: IFormCreateGroupProps) {
    const [data, setData] = useState<TInfoChat>(chatInfo);
    const [file, setFile] = useState<File | null>(null);
    const [isChangeLogo, setIsChangeLogo] = useState<boolean>(false);
    const [users, setUsers] = useState<TUser[]>(chatInfo.participants);
    const [showModalListUsers, setShowModalListUsers] = useState<boolean>(false);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({
            ...prev,
            title: e.target.value
        }
        ));
    }

    const handleSave = () => {
        const participantIds = users.map(item => item._id);
        console.log(participantIds)
        onSave(participantIds, data.title, file, data._id);
    };

    return (
        <div className={style.formChange}>
            <ModalListUsers isOpen={showModalListUsers} onClose={() => setShowModalListUsers(false)} onSelect={setUsers} selectedUsers={users} />
            <div className={style.formChange__form}>
                <Input value={data.title} placeholder="Название группы" label="Название группы" onChange={handleChangeTitle} />
                <div>
                    <p>Лого</p>
                    {isChangeLogo ?
                        <Upload value={file} onChange={(file: File | null) => setFile(file)} label="Выберите картинку" />

                        : <Image src={chatInfo.logo} width={300} height={400} alt="logo group" />}
                    <Button onClick={() => setIsChangeLogo(true)}>Изменить лого</Button>
                </div>
                <div className="flex">
                    <p className="mr-4">Список участников</p>
                    <Button onClick={() => setShowModalListUsers(true)}>Добавить нового участника</Button>
                </div>
                {users?.map((user, index) => {
                    return (
                        <div key={index} className="mb-4">{user.name} ({user.nik}) </div>
                    )
                })}
                <Button color="basic" onClick={handleSave}>Сохранить изменения</Button>
            </div>
        </div>
    );
}

export default FormChangeGroup;