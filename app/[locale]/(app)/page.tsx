/* eslint-disable @next/next/no-img-element */
'use client';

import { CopyEnum } from '@/types/copy';
import { CounterType } from '@/types/type';
import { getBaseUrl } from '@/utils/base';
import { Button, DropdownMenu, Popover, Select, Separator, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { HexColorPicker } from 'react-colorful';
import { isUrl } from '@/utils/url';
import { isGitHubProfile, isGitHubRepo } from '@/utils/github';
import { isXPost, isXProfile } from '@/utils/x';
import { BadgeStyle } from '@/types/badge';
import { useTranslations } from 'next-intl';
import packageInfo from '@/package.json';

export default function App() {
    const t = useTranslations();

    const [type, setType] = useState<CounterType>('url');
    const [input, setInput] = useState<string>('');
    const [labelColor, setLabelColor] = useState<string>('#555555');
    const [textColor, setTextColor] = useState<string>('#ffffff');
    const [generatedUrl, setGeneratedUrl] = useState<string>('');
    const [badgeLabel, setBadgeLabel] = useState<string>('');
    const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>('flat');

    const onGenerate = () => {
        if (!input) return toast.error(t('input_required'));

        const validationMap = {
            url: isUrl,
            'github-profile': isGitHubProfile,
            'github-repo': isGitHubRepo,
            'x-profile': isXProfile,
            'x-post': isXPost,
        };

        if (!validationMap[type](input)) return toast.error(`${t('invalid')} ${t(type.replace('-', '_'))}`);

        const badgeParams = badgeLabel
            ? `&badge=true&badgeContent=${encodeURIComponent(badgeLabel)}&badgeLabelColor=${encodeURIComponent(labelColor)}&badgeColor=${encodeURIComponent(textColor)}&badgeStyle=${badgeStyle}`
            : `&badge=true&badgeLabelColor=${encodeURIComponent(labelColor)}&badgeColor=${encodeURIComponent(textColor)}&badgeStyle=${badgeStyle}`;

        setGeneratedUrl(`/api/count?type=${type}&input=${input}${badgeParams}`);
        toast.success(t('generated'));
    };

    const onCopy = async (copyType: CopyEnum) => {
        const baseUrl = getBaseUrl() + generatedUrl;
        const copyMap = {
            [CopyEnum.Markdown]: `![${t('counter')}](${baseUrl})`,
            [CopyEnum.HTML]: `<img src="${baseUrl}" alt="${t('counter')}" />`,
            [CopyEnum.URL]: baseUrl,
        };

        if (copyType === CopyEnum.SVG) {
            const svg = await fetch(generatedUrl).then((res) => res.text());
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'counter.svg';
            a.click();
            URL.revokeObjectURL(url);
            toast.success(t('downloaded'));
        } else {
            navigator.clipboard.writeText(copyMap[copyType]);
            toast.success(t('copied'));
        }
    };

    return (
        <main className='flex max-h-full min-h-screen w-full flex-col items-center justify-center bg-white text-black dark:bg-black/90 dark:text-white'>
            <header className='absolute top-0 flex w-full items-center justify-between p-10'>
                <div>
                    <p>{t('counter')}</p>
                </div>
                <div>
                    <Button variant='outline' asChild>
                        <Link href='https://github.com/okisdev/counter' target='_blank'>
                            <p>{t('open_source')}</p>
                            <FiArrowUpRight />
                        </Link>
                    </Button>
                </div>
            </header>

            <div className='flex w-11/12 flex-wrap justify-between gap-2 md:w-8/12'>
                <div className='relative flex h-36 w-full items-center justify-center rounded-xl border bg-neutral-100 px-10 py-6 shadow backdrop-blur dark:border-neutral-700 dark:bg-neutral-800/60 md:h-96 md:w-10/12 lg:w-6/12'>
                    {generatedUrl && <img src={generatedUrl.replace('/count', '/get')} alt='badge' />}
                </div>

                <div className='flex w-full flex-col justify-between rounded-xl border bg-neutral-100 px-10 py-6 shadow backdrop-blur dark:border-neutral-700 dark:bg-neutral-800/60 md:w-4/12'>
                    <div className='my-3 flex w-full flex-col gap-2 md:gap-3'>
                        <div className='flex flex-col gap-2 md:flex-row md:gap-3'>
                            <div className='flex flex-col gap-0.5'>
                                <p className='text-sm'>{t('type')}</p>
                                <Select.Root
                                    value={type}
                                    onValueChange={(value) => {
                                        setType(value as CounterType);
                                    }}
                                >
                                    <Select.Trigger />
                                    <Select.Content>
                                        <Select.Item value='url'>{t('url')}</Select.Item>
                                        <Select.Separator />
                                        <Select.Group>
                                            <Select.Label>GitHub</Select.Label>
                                            <Select.Item value='github-profile'>{t('profile')}</Select.Item>
                                            <Select.Item value='github-repo'>{t('repo')}</Select.Item>
                                        </Select.Group>
                                        <Select.Separator />
                                        <Select.Group>
                                            <Select.Label>X</Select.Label>
                                            <Select.Item value='x-profile'>{t('profile')}</Select.Item>
                                            <Select.Item value='x-post'>{t('post')}</Select.Item>
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                            </div>
                            <div className='flex flex-col gap-0.5'>
                                <p className='text-sm'>{t(type.replace('-', '_'))}</p>
                                <TextField.Root placeholder='example.com' value={input} onChange={(e) => setInput(e.target.value)} required />
                            </div>
                        </div>
                        <Separator className='w-full' />
                        <div className='flex flex-col flex-wrap gap-2 md:flex-row md:gap-3'>
                            <div className='flex flex-col gap-0.5'>
                                <p className='text-sm'>{t('label')}</p>
                                <TextField.Root placeholder={t('views')} value={badgeLabel} onChange={(e) => setBadgeLabel(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-0.5'>
                                <p className='text-sm'>{t('colour')}</p>
                                <Popover.Root>
                                    <Popover.Trigger>
                                        <Button variant='soft'>{t('choose')}</Button>
                                    </Popover.Trigger>
                                    <Popover.Content className='flex flex-row gap-5'>
                                        <div className='flex flex-col items-center space-y-2'>
                                            <HexColorPicker color={labelColor} onChange={setLabelColor} />
                                            <button
                                                className='w-full cursor-pointer rounded-md border p-1 text-white'
                                                style={{ backgroundColor: labelColor, color: textColor }}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(labelColor);
                                                    toast.success('copied');
                                                }}
                                            >
                                                <p className='text-sm'>{labelColor}</p>
                                            </button>
                                            <p className='text-sm'>{t('label')}</p>
                                        </div>
                                        <div className='flex flex-col items-center space-y-2'>
                                            <HexColorPicker color={textColor} onChange={setTextColor} />
                                            <button
                                                className='w-full cursor-pointer rounded-md border p-1 text-white'
                                                style={{ backgroundColor: labelColor, color: textColor }}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(textColor);
                                                    toast.success('copied');
                                                }}
                                            >
                                                <p className='text-sm'>{textColor}</p>
                                            </button>
                                            <p className='text-sm'>{t('text')}</p>
                                        </div>
                                    </Popover.Content>
                                </Popover.Root>
                            </div>
                            <div className='flex flex-col gap-0.5'>
                                <p className='text-sm'>{t('style')}</p>
                                <Select.Root
                                    value={badgeStyle}
                                    onValueChange={(value) => {
                                        setBadgeStyle(value as BadgeStyle);
                                    }}
                                >
                                    <Select.Trigger />
                                    <Select.Content>
                                        <Select.Item value='plastic'>{t('plastic')}</Select.Item>
                                        <Select.Item value='flat'>{t('flat')}</Select.Item>
                                        <Select.Item value='flat-square'>{t('flat_square')}</Select.Item>
                                        <Select.Item value='for-the-badge'>{t('for_the_badge')}</Select.Item>
                                        <Select.Item value='social'>{t('social')}</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end space-x-2'>
                        <Button onClick={onGenerate} className='cursor-pointer rounded bg-blue-500 p-2 text-white'>
                            {t('generate')}
                        </Button>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button className='cursor-pointer rounded bg-blue-500 p-2 text-white'>
                                    {t('copy')}
                                    <DropdownMenu.TriggerIcon />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item onSelect={() => onCopy(CopyEnum.Markdown)}>{t('markdown')}</DropdownMenu.Item>
                                <DropdownMenu.Item onSelect={() => onCopy(CopyEnum.SVG)}>{t('svg')}</DropdownMenu.Item>
                                <DropdownMenu.Item onSelect={() => onCopy(CopyEnum.HTML)}>{t('html_tag')}</DropdownMenu.Item>
                                <DropdownMenu.Item onSelect={() => onCopy(CopyEnum.URL)}>{t('url')}</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                </div>
            </div>
            <footer className='absolute bottom-8 w-11/12 space-y-6 md:bottom-16 md:w-8/12 lg:w-6/12'>
                <div className='flex items-center justify-between px-3 text-sm'>
                    <div className='flex flex-row space-x-2 text-neutral-600 dark:text-neutral-400'>
                        <p>MIT</p>
                        <p>{packageInfo.version}</p>
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <p className='text-neutral-600 dark:text-neutral-400'>{t('by')}</p>
                        <Link href='https://harryyep.com' target='_blank' className='text-black hover:underline dark:text-white'>
                            Harry Yep
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
