"use client"
// styles
import MyLineChart from '@/components/element/chart/LineChart';
import styles from '@/public/styles/dashboard.module.scss'
import { LuArrowBigRightDash, LuArrowBigLeftDash } from "react-icons/lu";
import { admin_index } from '@/app/lib/api/users/admin_index';
import React, { useState, useEffect, useRef } from "react";


export default function Dashboard () {
    const [entry, setEntry] = useState(0);
    const [exits, setExits] = useState(0);
    const [exits_data, setExitsData] = useState([]);
    const [entries_data, setEntriesData] = useState([]);


    const getIndex = async () => {
        try {
            let respones = await admin_index()
            console.log(respones);
            if (respones.status === 200) {
                setEntry(respones.entries)
                setExits(respones.exits)
                setExitsData(respones.exit_chart)
                setEntriesData(respones.entry_chart)
            }
        } catch(e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getIndex();
    }, []);   

    return (
        <div className="flex flex-col gap-y-10 px-2 md:px-0">
            <h1 className='text-center font-bold'>به پنل دریتا خوش آمدید</h1>
            <div className='grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6'>
                <div className={styles.cardContainer + " flex justify-between items-center"}>
                    <div className='flex flex-col gap-y-2'>
                        <h3>آمار ورودی ماه</h3>
                        <span>{entry} عدد</span>
                    </div>
                    <LuArrowBigRightDash color='#FFF' fontSize={36} />
                </div>
                <div className={styles.cardContainer + " flex justify-between items-center"}>
                    <div className='flex flex-col gap-y-2'>
                        <h3>آمار خروجی ماه</h3>
                        <span>{exits} عدد</span>
                    </div>
                    <LuArrowBigLeftDash color='#FFF' fontSize={36} />
                </div>
            </div>
            <MyLineChart exits={exits_data} entries={entries_data} />
        </div>
    )
}