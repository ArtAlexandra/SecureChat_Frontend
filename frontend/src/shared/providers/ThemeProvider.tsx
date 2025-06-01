'use client';

import { useEffect } from 'react';
import useTheme from './useTheme';

interface IThemeProviderProps {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: IThemeProviderProps) {
    const { theme } = useTheme();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <>{children}</>;
}