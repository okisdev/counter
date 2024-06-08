export type BadgeStyle = 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';

export interface Badge {
    label?: string | null;
    message: string;
    color: string;
    labelColor?: string;
    style?: BadgeStyle;
    logo?: string | null;
}
