import { Theme, ThemePanel } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

export default function RootProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider attribute='class'>
            <Theme accentColor='sky' radius='large'>
                {children}

                {/* <ThemePanel /> */}
            </Theme>

            <Toaster position='top-right' />
        </ThemeProvider>
    );
}
