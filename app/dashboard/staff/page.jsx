"use client"
// styles
import styles from '@/public/styles/dashboard.module.scss';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Dashboard () {
    return (
        <div className="flex flex-col gap-y-10 px-2 md:px-0">
            <h1 className='text-center font-bold'> <u>{Cookies.get('name')}</u> به پنل دریتا خوش آمدید </h1>
            <div className="w-full flex flex-col gap-y-16 mt-20">
                <Link href='/dashboard/scanner' className={`${styles.staffCardContainer} ${styles.secondaryCardContainer}`}>
                    <h3>ثبت محصول ورودی</h3>
                </Link>
                <Link href='/dashboard/scanner' className={`${styles.staffCardContainer} ${styles.primaryCardContainer}`}>
                    <h3>ثبت محصول خروجی</h3>
                </Link>
            </div>
        </div>
    )
}
