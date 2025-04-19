'use client';

import React, { useState } from "react";
import style from './Search.module.scss';

interface ISearchProps {
    onChange: (value: string) => void;
};

function Search({ onChange }: ISearchProps) {
    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
    };
    
    return (
        <div className={style.search}>
            <input type="text" value={value} onChange={handleChange} className={style.search__input} placeholder="Поиск..."/>
        </div>
    );
}

export default Search;