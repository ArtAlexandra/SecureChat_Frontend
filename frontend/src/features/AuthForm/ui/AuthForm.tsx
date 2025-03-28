'use client';

import { Button, Input } from 'antd';
import { useState } from 'react';
import style from './AuthForm.module.scss';
const enum STEPS {
    FIRST = 'first',
    SECOND = 'second'
}

function AuthForm() {
    const [step, setStep] = useState<STEPS>(STEPS.FIRST);

    const handleSubmitFormFirst = (e: React.FormEvent) => {
        console.log(e);
        setStep(STEPS.SECOND)
    };

    return (
        <div className={style.authForm}>

            <div className={style.authForm__container}>
                <h1 className={style.authForm__container__title}>Регистрация</h1>

                {step === STEPS.FIRST && <>
                    <form onSubmit={handleSubmitFormFirst} className={style.authForm__container__form}>
                        <h1 className={style.authForm__container__item}>Имя</h1>
                        <Input placeholder='Имя' />

                        <h1 className={style.authForm__container__item}>Никнейм</h1>
                        <Input placeholder='Никнейм' />

                        <h1 className={style.authForm__container__item}>Почта</h1>
                        <Input placeholder='Почта' type='email' />

                        <Button type="primary" htmlType="submit" className={style.authForm__container__button}>Продолжить</Button>
                    </form>
                </>}

                {step === STEPS.SECOND && <>
                    <form className={style.authForm__container__form}>
                        <h1 className={style.authForm__container__item}>Код подтверждения</h1>
                        <Input placeholder='Код подтверждения' />
                        <Button type="primary" className={style.authForm__container__button}>Зарегистрироваться</Button>
                    </form>
                </>}
            </div>
        </div>
    );
}

export default AuthForm;