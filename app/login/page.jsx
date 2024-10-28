// styles
import styles from '@/public/styles/login.scss'

export default function Login() {
    return (
        <div className={styles.loginFrom}>
            <form>
                <label htmlFor="username">نام کاربری</label>
                <input type="text" id="username" />
                <label htmlFor="password">رمز عبور</label>
                <input type="password" id="password" />
            </form>
        </div>
    )
}