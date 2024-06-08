import { redis } from '@/lib/redis';
import { generateSVGBadge } from '@/utils/badge';
import { formatUrl, isUrl } from '@/utils/url';
import { NextResponse } from 'next/server';
import { CounterType } from '@/types/type';
import { BadgeStyle } from '@/types/badge';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get('type') as CounterType;
    const input = searchParams.get('input');
    const badge = searchParams.get('badge');
    const badgeContent = searchParams.get('badgeContent') ?? 'views';
    const badgeColor = searchParams.get('badgeColor') ?? 'brightgreen';
    const badgeLabelColor = searchParams.get('badgeLabelColor') ?? '#555555';
    const badgeStyle = (searchParams.get('badgeStyle') as BadgeStyle) ?? 'flat';

    if (!input || (type === 'url' && !isUrl(input))) {
        return new NextResponse(JSON.stringify({ code: 400, error: 'invalid url' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    let count = 0;

    const typePrefixes: Record<CounterType, string> = {
        url: '',
        'github-profile': 'github-profile-',
        'github-repo': 'github-repo-',
        'x-profile': 'x-profile-',
        'x-post': 'x-post-',
    };

    const key = type === 'url' ? formatUrl(input) : `${typePrefixes[type]}${input}`;

    count = (await redis.get(key)) ?? 0;

    if (badge) {
        return generateSVGBadge(String(count), badgeContent, badgeColor, badgeLabelColor, badgeStyle);
    }

    return new NextResponse(JSON.stringify({ code: 200, type, input, count, message: 'get badge info', staticBadge: `/api/badge?content=${badgeContent}&data=${count}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
