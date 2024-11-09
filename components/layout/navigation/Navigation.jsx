// styles
import styles from './navigation.module.scss'

// components
import Link from 'next/link'
import { LuScan, LuUser, LuHome, LuArchive, LuLayoutList } from "react-icons/lu";

export default function Navigation() {
    return (
        <nav className={`${styles.navigation} shadow`}>
            <ul>
                <li>
                    <Link href='#'>
                        <LuUser size={24} />
                    </Link>
                </li>
                <li>
                    <Link href='#'>
                        <LuHome size={24} />
                    </Link>
                </li>
                <li className={styles.scanlink}>
                    <Link href='#'>
                        <LuScan size={28} />
                    </Link>
                </li>
                <li>
                    <Link href='#'>
                        <LuArchive size={24} />
                    </Link>
                </li>
                <li>
                    <Link href='#'>
                        <LuLayoutList size={24} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}