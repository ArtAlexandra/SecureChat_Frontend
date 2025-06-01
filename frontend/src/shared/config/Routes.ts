export const ROUTES = {
    auth: {
        signin: '/signin',
        signup: '/signup'
    },
    message: {
        main: '/main',
        selectedMessage: '/chat/:id'
    },
    settings: {
        theme: '/settings/theme',
        profile: '/settings/profile',
        createGroup: '/settings/create-group',
        changeGroup: {
            generatePath: (id: string | number) => `/settings/change-group/?group=${id}`,
        },
    }
};