import { TUser } from "@/shared/config/TUser";
import style from './UserInfo.module.scss';
import Button from "@/shared/ui/Button";
import ModalChangedPassword from "./ModalChangedPassword";
import { useState } from "react";
import { updatePassword } from "@/shared/api/user";

interface IUserInfoProps {
    user: TUser;
};

function UserInfo({ user }: IUserInfoProps) {
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [errorChangePassword, setErrorChangePassword] = useState<string>('');
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

    return (
        <>
            <ModalChangedPassword isOpen={showChangePassword} error={errorChangePassword} onChange={handleChangePassword} onCancel={() => setShowChangePassword(false)} />
            <div className={style.userInfo}>
                <p>Имя пользователя</p>
                <p>{user.name}</p>
                <p>Никнейм</p>
                <p>{user.nik}</p>
                <Button onClick={handleOpenChangePassword}>Изменить пароль</Button>
            </div>
        </>
    );
}

export default UserInfo;