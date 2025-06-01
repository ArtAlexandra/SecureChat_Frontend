'use client';

import { useEffect, useState } from 'react';

type Theme = 'pink' | 'green' | 'blue';

export default function useTheme() {
    const [theme, setTheme] = useState<Theme>('pink');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const initialTheme = savedTheme || 'green';
        setTheme(initialTheme);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        localStorage.setItem('theme', theme);

        document.documentElement.setAttribute('data-theme', theme);
    }, [theme, isMounted]);

    const toggleTheme = (theme: Theme) => {
        console.log(theme)
        setTheme(theme);
    };

    return { theme, toggleTheme, isMounted };
}