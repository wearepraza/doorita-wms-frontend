"use client"

// styles
import Cookies from 'js-cookie';
import styles from './navigation.module.scss'

// components
import Link from 'next/link'
import { LuScan, LuUser, LuHome, LuArchive, LuLayoutList } from "react-icons/lu";

export default function Navigation() {
    return (
        <nav className={`${styles.navigation} shadow`}>
            <ul>
                {Cookies.get('role') && parseInt(Cookies.get('role')) === 2 ? (
                    <li>
                        <Link href='/dashboard/admin/users' className='flex flex-col items-center gap-y-1'>
                            <LuUser size={24} />
                            <h5>کاربران</h5>
                        </Link>
                    </li>
                    ) : (<li></li>)
                }
                {Cookies.get('role') && parseInt(Cookies.get('role')) === 2 ? (
                    <li>
                        <Link href='/dashboard/admin' className='flex flex-col items-center gap-y-1'>
                            <LuHome size={24} />
                            <h5>داشبورد</h5>
                        </Link>
                    </li>
                    ) : (<li></li>)
                }
                <li className={styles.scanlink}>
                    <Link href='/dashboard/scanner'>
                        <LuScan size={28} />
                    </Link>
                </li>
                {Cookies.get('role') && parseInt(Cookies.get('role')) === 2 ? (
                    <li>
                        <Link href='/dashboard/admin/products' className='flex flex-col items-center gap-y-1'>
                            <LuArchive size={24} />
                            <h5>محصولات</h5>
                        </Link>
                    </li>
                    ) : (<li></li>)
                }
                
                {Cookies.get('role') && parseInt(Cookies.get('role')) === 2 ? (
                    <li>
                        <Link href='/dashboard/admin/logs' className='flex flex-col items-center gap-y-1'>
                            <LuLayoutList size={24} />
                            <h5>آمار</h5>
                        </Link>
                    </li>
                    ) : (<li></li>)
                }
                
            </ul>
        </nav>
    )
}