'use client';

import { ROUTES } from "@/shared/config/Routes";
import { Button, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import style from './SignInPage.module.scss';
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
        const data: ISignIn = user;
        await axios.post('/users/signin', data)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('securechat_token', res.data.access_token)
                router.replace(ROUTES.message.main);
            })
            .catch((error) => {
                setError(error.response.data?.warning);
            })
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
                    <Input placeholder="Пароль" onChange={(e) => handleSetInfo('password', e.target.value)} />

                    <Button type="primary" htmlType="submit" className={style.signin__container__button}>Войти</Button>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;