'use client'

// styles
import styles from '@/public/styles/dashboard.module.scss'

// components
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { log_enter } from '@/app/lib/api/logs/log_enter';
import { log_exit } from '@/app/lib/api/logs/log_exit';

export default function Dashboard () {
    const { product: product_id } = useParams(); 

    const enterProduct = async () => {
        try {
            let response = await log_enter(product_id)
            if (response.status === 200) {
                setIsCreateModalOpen(false)

                alert("ثبت انجام شد")
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    }

    const exitProduct = async () => {
        try {
            let response = await log_exit(product_id)
            if (response.status === 200) {
                setIsCreateModalOpen(false)

                alert("ثبت انجام شد")
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    }

    return (
        <div>
            <button>ورودی</button>
            <button>خروجی</button>
        </div>
    )
}