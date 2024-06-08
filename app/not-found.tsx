import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <div className='mx-auto flex min-h-screen items-center justify-center'>
            <div className='flex flex-col space-y-4 text-center'>
                <div className='flex flex-col space-y-2'>
                    <p>404 Not Found</p>
                    <p>The source you requested is unavailable.</p>
                </div>
                <div>
                    <Link href='/' className='font-medium'>
                        <span>BACK</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
