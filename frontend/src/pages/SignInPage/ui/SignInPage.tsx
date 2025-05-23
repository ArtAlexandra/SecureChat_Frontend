'use client';

import { ROUTES } from "@/shared/config/Routes";
import { Input } from "antd";
import Button from '@/shared/ui/Button';
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from './SignInPage.module.scss';
import { signIn } from "@/shared/api/auth";

interface ISignIn {
    nik: string;
    password: string;
};

function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<ISignIn>({
        nik: "",
        password: ""
    });

    const handleSetInfo = (key: keyof ISignIn, value: string) => {
        setUser(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const answer = await signIn({ nik: user.nik, password: user.password });
        if (!answer) router.replace(ROUTES.message.main);
        setError(answer);
    };

    const handleMoveSignUp = () => {
        router.replace(ROUTES.auth.signup);
    };

    return (
        <div className={style.signin}>
            <div className={style.signin__container}>
                <h1 className={style.signin__container__title}>Авторизация</h1>
                <form onSubmit={handleSubmitForm} className={style.signin__container__form}>

                    <p className={style.signin__container__error}>{error}</p>
                    <p className={style.signin__container__item}>Никнейм</p>
                    <Input placeholder="Никнейм" onChange={(e) => handleSetInfo('nik', e.target.value)} />

                    <p className={style.signin__container__item}>Пароль</p>
                    <Input.Password placeholder="Пароль" onChange={(e) => handleSetInfo('password', e.target.value)} />

                    <Button type="submit">Войти</Button>
                </form>
                <Button onClick={handleMoveSignUp}>Зарегистрироваться</Button>

            </div>
        </div>
    );
}

export default SignInPage;