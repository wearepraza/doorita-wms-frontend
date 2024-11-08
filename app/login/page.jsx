// styles
import styles from '../../public/styles/login.module.scss'

// components
import Image from 'next/image'

// assets
import logo from '@/public/assets/images/logo.svg'

export default function Login() {
    return (
        <div className={styles.loginFormContainer}>
            <Image src={logo} width={100} height={100} />
            <form className={`${styles.loginForm} shadow`}>
                <label htmlFor="username">نام کاربری</label>
                <input type="text" id="username" placeholder='نام کاربری خود را وارد کنید' />
                <label htmlFor="password">رمز عبور</label>
                <input type="password" id="password" placeholder='رمز عبور خود را وارد کنید' />
                <button className='primaryButton'>ورود به حساب کاربری</button>
            </form>
        </div>
    )
}