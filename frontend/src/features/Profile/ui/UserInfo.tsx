'use client';

import { TUser } from "@/shared/config/TUser";
import style from './UserInfo.module.scss';
import Button from "@/shared/ui/Button";
import ModalChangedPassword from "./ModalChangedPassword";
import { useEffect, useState } from "react";
import { updateImage, updatePassword } from "@/shared/api/user";
import Upload from "@/shared/ui/Upload";
import Image from "next/image";

interface IUserInfoProps {
    user: TUser;
};

function UserInfo({ user }: IUserInfoProps) {
    const [userData, setUserData] = useState<TUser| undefined>(undefined);
    const [userImage, setUserImage] = useState<File | null>(null);
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [errorChangePassword, setErrorChangePassword] = useState<string>('');

    useEffect(() => {
        if(!user) return;
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
        if(!userImage) return;
        const user = await updateImage(userImage);
        setUserData(user);
        setUserImage(null);
    };
    return (
        <>
            <ModalChangedPassword isOpen={showChangePassword} error={errorChangePassword} onChange={handleChangePassword} onCancel={() => setShowChangePassword(false)} />
            <div className={style.userInfo}>
                <p>Имя пользователя</p>
                <p>{userData?.name}</p>
                <p>Никнейм</p>
                <p>{userData?.nik}</p>
                {userData?.image && <Image src={userData.image} width={200} height={200} alt="userImage" /> }
                <Upload  onChange={(file: File|null) => setUserImage(file)} text="Изменить фото" value={userImage}/>
                    {userImage && <Button onClick={handleChangeImage}>Сохранить</Button>}
                <Button onClick={handleOpenChangePassword}>Изменить пароль</Button>
            </div>
        </>
    );
}

export default UserInfo;