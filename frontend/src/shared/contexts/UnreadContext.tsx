'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { getUnreadChatsCount } from '@/shared/api/chats';

type UnreadContextType = {
    unreadCount: number;
    refreshUnreadCount: () => Promise<void>;
};

const UnreadContext = createContext<UnreadContextType>({
    unreadCount: 0,
    refreshUnreadCount: async () => { },
});

export const useUnread = () => useContext(UnreadContext);

export const UnreadProvider = ({ children }: { children: ReactNode }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    const refreshUnreadCount = useCallback(async () => {
        try {
            const count = await getUnreadChatsCount();
            setUnreadCount(count);
        } catch (error) {
            console.error('Failed to refresh unread count:', error);
        }
    }, []);

    return (
        <UnreadContext.Provider value={{ unreadCount, refreshUnreadCount }}>
            {children}
        </UnreadContext.Provider>
    );
};