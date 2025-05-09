'use client';

import React, { useState } from "react";
import style from './Search.module.scss';
import type { TUser } from "@/shared/config/TUser";
import { searchUser } from '../api/searchUser';

interface ISearchProps {
    onCreateChat: (id: string) => void;
};

function Search({ onCreateChat }: ISearchProps) {
    const [value, setValue] = useState<string>('');
    const [listUser, setListUser] = useState<TUser[]>([]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (newValue.length === 0) {
            setListUser([]);
        }
        if (newValue.length >= 3) {
            const answer = await searchUser(newValue);
            setListUser(answer);
        }

    };

    const handleCreateChat = async (id: string) => {
        await onCreateChat(id);
        setListUser([]);
        setValue('');
    }

    return (
        <div className={style.search}>
            <input type="text" value={value} onChange={handleChange} className={style.search__input} placeholder="Поиск..." />
            {listUser
                &&
                <div className={style.search__list}>
                    {listUser.map((user, index) => {
                        return (
                            <p key={index} onClick={() => handleCreateChat(user._id)} className={style.search__list__item}>{user.name} ({user.nik})</p>
                        )
                    })}
                </div>
            }
        </div>
    );
}

export default Search;