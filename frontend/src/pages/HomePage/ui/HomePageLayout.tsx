import { UnreadProvider } from "@/shared/contexts/UnreadContext";

interface IHomePageLayoutProps {
    children: React.ReactNode;
};

function HomePageLayout({ children }: IHomePageLayoutProps) {
    return (
        <>
            <UnreadProvider>
                {children}
            </UnreadProvider>
        </>
    );
}

export default HomePageLayout;