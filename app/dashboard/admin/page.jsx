// styles
import styles from '@/public/styles/dashboard.module.scss'

export default function Dashboard () {
    return (
        <div className="flex flex-col gap-y-10 px-2 md:px-0">
            <h1 className='text-center font-bold'>به پنل دریتا خوش آمدید</h1>
            <div className='grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6'>
                <div className={styles.cardContainer}>
                    <h3>آمار ورودی ماه</h3>
                    <span>331 عدد</span>
                </div>
                <div className={styles.cardContainer}>
                    <h3>آمار خروجی ماه</h3>
                    <span>331 عدد</span>
                </div>
            </div>
        </div>
    )
}