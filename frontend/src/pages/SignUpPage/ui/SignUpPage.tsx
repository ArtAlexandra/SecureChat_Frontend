'use client';

import { Button, Input } from 'antd';
import { useState } from 'react';
import style from './SignUp.module.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/Routes';

const enum STEPS {
    FIRST = 'first',
    SECOND = 'second'
};

interface ISignUp {
    name: string;
    nik: string;
    password: string;
    email: string;
    code?: string;
};

function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [step, setStep] = useState<STEPS>(STEPS.FIRST);
    const [user, setUser] = useState<ISignUp>({
        name: "",
        nik: "",
        password: "",
        email: "",
        code: ""
    });

    const handleSetInfo = (key: keyof ISignUp, value: string) => {
        setUser(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmitFormFirst = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: ISignUp = {
            email: user.email,
            name: user.name,
            nik: user.nik,
            password: user.password
        }
        await axios.post('/users/auth/send-code', data)
            .then(() => {
                setStep(STEPS.SECOND)
            })
            .catch((error) => {
                console.log(error)
            })
    };


    const handleSubmitFormSecond = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: ISignUp = user;
        await axios.post('/users/auth/create', data)
            .then(() => {
                router.replace(ROUTES.message.main);
            })
            .catch((error) => {
                setError(error.response.data?.warning);
                setUser(prev => ({
                    ...prev,
                    'code': ''
                }));
            })
    };

    return (
        <div className={style.authForm}>

            <div className={style.authForm__container}>
                <h1 className={style.authForm__container__title}>Регистрация</h1>

                {step === STEPS.FIRST && <>
                    <form onSubmit={handleSubmitFormFirst} className={style.authForm__container__form}>
                        <h1 className={style.authForm__container__item}>Имя</h1>
                        <Input placeholder='Имя' onChange={(e) => handleSetInfo('name', e.target.value)} />

                        <h1 className={style.authForm__container__item}>Никнейм</h1>
                        <Input placeholder='Никнейм' onChange={(e) => handleSetInfo('nik', e.target.value)} />

                        <h1 className={style.authForm__container__item}>Почта</h1>
                        <Input placeholder='Почта' type='email' onChange={(e) => handleSetInfo('email', e.target.value)} />

                        <h1 className={style.authForm__container__item}>Пароль</h1>
                        <Input.Password placeholder='Пароль' type='password' onChange={(e) => handleSetInfo('password', e.target.value)} />

                        <Button type="primary" htmlType="submit" className={style.authForm__container__button}>Продолжить</Button>
                    </form>
                </>}

                {step === STEPS.SECOND && <>
                    <form className={style.authForm__container__form} onSubmit={handleSubmitFormSecond}>
                        <h1 className={style.authForm__container__item}>Код подтверждения отправлен на почту. Время жизни кода 15 минут</h1>
                        <p>{error}</p>
                        <Input placeholder='Код подтверждения' onChange={(e) => handleSetInfo('code', e.target.value)} value={user.code}/>
                        <Button type="primary" className={style.authForm__container__button} htmlType="submit">Зарегистрироваться</Button>
                    </form>
                </>}
            </div>
        </div>
    );
}

export default SignUpPage;