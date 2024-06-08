import { Badge, BadgeStyle } from '@/types/badge';
import { makeBadge } from 'badge-maker';
import { NextResponse } from 'next/server';

export const generateBadge = async (badge: Badge) => {
    return makeBadge({
        label: badge.label!,
        message: badge.message,
        color: badge.color,
        labelColor: badge.labelColor,
        style: badge.style,
    });
};

export const generateSVGBadge = async (badgeMessage: string, badgeContent: string, badgeColor: string, badgeLabelColor: string, badgeStyle: BadgeStyle) => {
    const badge = await generateBadge({
        label: badgeContent,
        message: badgeMessage,
        color: badgeColor,
        labelColor: badgeLabelColor,
        style: badgeStyle,
    });
    const response = new NextResponse(badge);
    response.headers.set('Content-type', 'image/svg+xml');
    return response;
};
