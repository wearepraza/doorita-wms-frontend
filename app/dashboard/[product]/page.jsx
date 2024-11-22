'use client'

// styles
import styles from '@/public/styles/product.module.scss'

// components
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { log_enter } from '@/app/lib/api/logs/log_enter';
import { log_exit } from '@/app/lib/api/logs/log_exit';

export default function Dashboard() {
    const { product: product_id } = useParams(); // Get the product ID from the route
    const [loading, setLoading] = useState(false); // State to handle loading

    const router = useRouter();

    // Function to handle adding to the stock
    const enterProduct = async () => {
        setLoading(true);
        try {
            let response = await log_enter(product_id); // Call the API
            if (response.status === 200) {
                alert("موجودی محصول با موفقیت اضافه شد!");
                router.push("/dashboard/scanner")
            } else {
                alert(`Error: ${response.message}`);
            }
        } catch (e) {
            console.error(e.message);
            alert("مشکلی در انجام فرایند رخ داد.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Function to handle reducing the stock
    const exitProduct = async () => {
        setLoading(true);
        try {
            let response = await log_exit(product_id); // Call the API
            if (response.status === 200) {
                alert("موجودی محصول با موفقیت کم شد.");
                router.push("/dashboard/scanner")
            } else {
                alert(`Error: ${response.message}`);
            }
        } catch (e) {
            console.error(e.message);
            alert("مشکلی در انجام فرایند رخ داد.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className={styles.dashboard}>
            <h1>مدیریت محصول: {product_id}</h1>
            <div className={styles.buttonContainer}>
                <button 
                    onClick={enterProduct} 
                    disabled={loading} 
                    className={`${styles.button} ${styles.enterButton}`}>
                    {loading ? "در حال انجام" : "افزایش موجودی"}
                </button>
                <button 
                    onClick={exitProduct} 
                    disabled={loading} 
                    className={`${styles.button} ${styles.exitButton}`}>
                    {loading ? "در حال انجام" : "کاهش موجودی"}
                </button>
            </div>
        </div>
    );
}
