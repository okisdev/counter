import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';

import RootProvider from '@/app/provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Counter',
    description: 'Counter',
};

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const locales = await getMessages();

    return (
        <html lang={locale} className={inter.className}>
            <body className='bg-white dark:bg-black'>
                <NextIntlClientProvider messages={locales}>
                    <RootProvider>{children}</RootProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
