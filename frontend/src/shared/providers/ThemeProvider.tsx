'use client';

import { useEffect } from 'react';
import useTheme from './useTheme';

import style from './ThemeProvider.module.scss'; 

interface IThemeProviderProps {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: IThemeProviderProps) {
    const { theme } = useTheme();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <div className={style.root}>{children}</div>;
}