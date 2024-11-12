'use client'

// styles
import styles from '@/public/styles/dashboard.module.scss'

// components
import Navigation from '@/components/layout/navigation/Navigation'
import Table from '@/components/element/table/Table'
import React, { useState, useEffect, useRef } from "react";
import { get_users_list } from '@/app/lib/api/users/get_list';

export default function Dashboard () {
    const [users, setUsers] = useState([]);

    const dropdownOptions = [
        { value: "ویرایش", name: "ویرایش" },
        { value: "نقش", name: "نقش" },
        { value: "ارسال", name: " ارسال پیام" },
        { value: "فاکتور", name: " نمایش فاکتور" },
        { value: "تغییر وضعیت", name: "تغییر وضعیت" },
        // { value: "حذف", name: "حذف" },
    ];
    
    const columns = [
        { header: "ردیف", key: "id" },
        { header: "نام و نام خانوادگی", key: "name" },
        { header: " نام کاربری", key: "username" },
        { header: "نقش", key: "role" },
        { header: " ...", key: "actions" },
    ];

    const getUsers = async () => {
        try {
            let response = await get_users_list()
            if (response.status === 200) {
                setUsers(response.items)
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);    

    return (
        <div>
            <Navigation />

            <div className="container mx-auto">
                {Object.keys(users).length > 0 ? (
                    <Table columns={columns} data={users} dropdownOptions={dropdownOptions} />
                ) : (
                    <div className="text-center">داده ای یافت نشد</div>
                )}
            </div>
        </div>
    )
}