'use client'

import styles from '../../public/styles/login.module.scss'
import Image from 'next/image'
import { useState } from 'react';
import logo from '@/public/assets/images/logo.svg'
import { login } from '../lib/api/authenticate/login';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleNext = async () => {
        // ارسال درخواست API برای دریافت کد تأیید
        let response = await login(username, password);
        console.log(response);
        if(response.status === 200) {
            const token = response.token;
            Cookies.set('authToken', token, { expires: 30 });
            Cookies.set('role', response.role, { expires: 30 });
            
            if (response.role === 1) {
                router.push('/dashboard/staff');
            } 
            if (response.role === 2) {
                router.push('/dashboard/admin');
            }

        } else {
            throw new Error(response.message);
        }
    };


    return (
        <div className={styles.loginFormContainer}>
            <Image src={logo} width={75} height={75} />
            <div className={`${styles.loginForm} shadow`}>
                <label htmlFor="username">نام کاربری</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder='نام کاربری خود را وارد کنید'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">رمز عبور</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder='رمز عبور خود را وارد کنید' 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='primaryButton' onClick={handleNext}>ورود به حساب کاربری</button>
            </div>
        </div>
    )
}