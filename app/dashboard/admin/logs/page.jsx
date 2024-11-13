'use client'

// styles
import styles from '@/public/styles/dashboard.module.scss'

// components
import Table from '@/components/element/table/Table'
import React, { useState, useEffect, useRef } from "react";

import { get_logs_list } from '@/app/lib/api/logs/get_list';

export default function Dashboard () {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dropdownOptions = [];
    
    const columns = [
        { header: "ردیف", key: "id" },
        { header: "نام محصول", key: "product_name" },
        { header: "انباردار", key: "staff_name" },
        { header: "ورودی", key: "entry_status" },
        { header: "تاریخ", key: "created_at" },
        { header: " ...", key: "actions" },
    ];

    const getLogs = async () => {
        try {
            let response = await get_logs_list()
            if (response.status === 200) {
                setItems(response.items)
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    };

    useEffect(() => {
        getLogs();
    }, []);    

    return (
        <div>
            <div className='flex flex-col gap-y-10 px-2 md:px-0'>

                {Object.keys(items).length > 0 ? (
                    <Table 
                        columns={columns} 
                        data={items} 
                        dropdownOptions={dropdownOptions} 
                        isOpen={isModalOpen}
                    />
                ) : (
                    <div className="text-center">داده ای یافت نشد</div>
                )}

            </div>
        </div>
    )
}