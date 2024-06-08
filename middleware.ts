import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'zh-HK'],

    defaultLocale: 'en',

    localePrefix: 'never',
});

export const config = {
    matcher: ['/', '/(zh-HK|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)'],
};
