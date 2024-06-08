import { BadgeStyle } from '@/types/badge';
import { generateSVGBadge } from '@/utils/badge';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const data = searchParams.get('data');

    const badgeContent = searchParams.get('badgeContent') ?? 'views';
    const badgeColor = searchParams.get('badgeColor') ?? 'brightgreen';
    const badgeLabelColor = searchParams.get('badgeLabelColor') ?? '#555555';
    const badgeStyle = (searchParams.get('badgeStyle') as BadgeStyle) ?? 'flat';

    return generateSVGBadge(data!, badgeContent, badgeColor, badgeLabelColor, badgeStyle);
}
