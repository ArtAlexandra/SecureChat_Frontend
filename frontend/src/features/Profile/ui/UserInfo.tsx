'use client';

import { TUser } from "@/shared/config/TUser";
import style from './UserInfo.module.scss';
import Button from "@/shared/ui/Button";
import ModalChangedPassword from "./ModalChangedPassword";
import { useEffect, useState } from "react";
import { updateImage, updateName, updatePassword } from "@/shared/api/user";
import Upload from "@/shared/ui/Upload";
import Image from "next/image";
import Input from "@/shared/ui/Input";

interface IUserInfoProps {
    user: TUser;
};

function UserInfo({ user }: IUserInfoProps) {
    const [userData, setUserData] = useState<TUser>({
        _id: '',
        name: '',
        createdAt: '',
        nik: '',
        theme: '',
        updatedAt: '',
        image: ''
    });
    const [userImage, setUserImage] = useState<File | null>(null);
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [errorChangePassword, setErrorChangePassword] = useState<string>('');

    useEffect(() => {
        if (!user) return;
        setUserData(user);
    }, [user]);

    const handleChangePassword = async (password: string) => {
        const answer = await updatePassword(password);
        if (answer) {
            setErrorChangePassword(answer);
            return;
        }
        setErrorChangePassword("Данные успешно сохранены");
        setShowChangePassword(false);
    };

    const handleOpenChangePassword = () => {
        setErrorChangePassword('');
        setShowChangePassword(true);
    };

    const handleChangeImage = async () => {
        if (!userImage) return;
        const user = await updateImage(userImage);
        setUserData(user);
        setUserImage(null);
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((prev) => ({
            ...prev,
            name: e.target.value
        }))
    };

    const handleSaveUser = async () => {
        await updateName(userData.name, userData._id);
    };

    return (
        <div className={style.userInfo}>
            <ModalChangedPassword isOpen={showChangePassword} error={errorChangePassword} onChange={handleChangePassword} onCancel={() => setShowChangePassword(false)} />
            <div className={style.userInfo__form}>
                <Input label="Имя пользователя" placeholder="Имя пользователя" value={userData?.name} onChange={handleChangeName} />
                <Input label="Никнейм" placeholder="Никнейм" value={userData?.nik} disabled />
                {userData?.image && !userImage && <Image src={userData.image} width={200} height={200} alt="userImage" />}
                <div>
                    <Upload onChange={(file: File | null) => setUserImage(file)} text="Изменить фото" value={userImage} />
                    {userImage && <Button onClick={handleChangeImage}>Сохранить картинку</Button>}
                </div>
                <Button onClick={handleSaveUser}>Сохранить</Button>
                <Button color="secondary" onClick={handleOpenChangePassword}>Изменить пароль</Button>
            </div>
        </div>
    );
}

export default UserInfo;