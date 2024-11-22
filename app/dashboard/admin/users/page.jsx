'use client'

// styles
import styles from '@/public/styles/dashboard.module.scss'

// components
import Table from '@/components/element/table/Table'
import React, { useState, useEffect, useRef } from "react";
import { get_users_list } from '@/app/lib/api/users/get_list';
import { create_user } from '@/app/lib/api/users/create_user';
import { delete_user } from '@/app/lib/api/users/delete_user';
import { update_user } from '@/app/lib/api/users/update_user';
import { update_pass } from '@/app/lib/api/users/update_password';
import ModalCp from '@/components/element/modal/ModalCp';
import { LuX } from "react-icons/lu";
import SelectBox from '@/components/element/select-box/SelectBox';
import { LuTrash2, LuLoader2 } from "react-icons/lu";

export default function Dashboard () {
    const [users, setUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(1);
    const [userId, setUserId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const modalContent = (closeModal) =>
        selectedItem.value === "ویرایش" ? (
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>ویرایش </h2>
            <div className="flex flex-col gap-y-4 mt-6">

                <div className={styles.inputRow}>
                    <label htmlFor="name">نام نام خانوادگی</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder='نام کاربر را وارد کنید'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.inputRow}>
                    <SelectBox 
                        label='نقش کاربری' 
                        options={[
                            {label: 'انباردار', value: 1},
                            {label: 'ادمین', value: 2}
                        ]} 
                        value={role}
                        onChange={(e) => {setRole(e.target.value);}}
                        className={'w-full'}
                    />
                </div>

                <button onClick={updateUser} className="btn primary-btn">
                    ویرایش کاربر
                </button>

            </div>
          </div>
        ) : selectedItem.value === "حذف" ? (
          <div className={styles.deleteModal}>
            <div className={styles.modalIcon}>
              <LuTrash2 className={styles.iconStyles} />
            </div>
            <div className={styles.text}>
              <h2>حذف</h2>
              <p>آیا میخواهید این ردیف را حذف کنید؟</p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.cancel} onClick={handleCloseModal}>
                لغو
              </button>
              <button
                className={styles.delete}
                onClick={async () => {
                  await delete_user(userId);
                  await getUsers()
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ) : selectedItem.value === "تغییر رمزعبور" ? (
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>تغییر رمزعبور </h2>
                <div className="flex flex-col gap-y-4 mt-6">

                <div className={styles.inputRow}>
                    <label htmlFor="password">رمزعبور</label>
                    <input 
                        type="text" 
                        id="password" 
                        placeholder='رمزعبور را وارد کنید'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={async () => {
                    update_pass(userId, password);
                    setPassword("")
                    closeModal()
                }} className="btn primary-btn">
                    ویرایش رمزعبور
                </button>

                </div>
            </div>
          ) : (
          <div>
            <h1>هیچ موردی انتخاب نشده</h1>
            <p>لطفاً یک مورد انتخاب کنید.</p>
          </div>
        );

    const dropdownOptions = [
        { value: "ویرایش", name: "ویرایش" },
        { value: "تغییر رمزعبور", name: "تغییر رمزعبور" },
        { value: "حذف", name: "حذف" }
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

    const createUser = async () => {
        try {
            let response = await create_user(name, username, password, role)
            if (response.status === 200) {
                setIsCreateModalOpen(false)
                setName("")
                setPassword("")
                setUsername("")
                setRole(1)

                await getUsers()
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    }

    const updateUser = async () => {
        try {
            let response = await update_user(name, role, userId)
            if (response.status === 200) {
                setName("")
                setPassword("")
                setUsername("")
                setRole(1)
                handleCloseModal()

                await getUsers()
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);    

    return (
        <div>
            <div className='flex flex-col gap-y-10 px-2 md:px-0'>
                <div>
                    <button onClick={() => setIsCreateModalOpen(true)} className="btn primary-btn">
                        ایجاد کاربر
                    </button>
                </div>

                {Object.keys(users).length > 0 ? (
                    <Table 
                        columns={columns} 
                        data={users} 
                        dropdownOptions={dropdownOptions} 
                        onDropDataChange={(item, option) => {setSelectedItem(option); setName(item.name); setUserId(item.id), setRole(1)}}
                        modalContent={modalContent}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                ) : (
                    <div className="text-center">داده ای یافت نشد</div>
                )}

                {/* CREATE MODAL */}
                {isCreateModalOpen && (
                    <ModalCp isOpen={isCreateModalOpen} onRequestClose={() => setIsCreateModalOpen(false)}>
                        <div className={styles.modalHeader}>
                            <button onClick={() => setIsCreateModalOpen(false)}>
                                <LuX />
                            </button>
                        </div>
                        <div className="flex flex-col gap-y-4 mt-6">

                            <div className={styles.inputRow}>
                                <label htmlFor="name">نام نام خانوادگی</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder='نام کاربر را وارد کنید'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <label htmlFor="username">نام کاربری</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    placeholder='نام کاربری را وارد کنید'
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <label htmlFor="password">رمزعبور</label>
                                <input 
                                    type="text" 
                                    id="password" 
                                    placeholder='رمزعبور را وارد کنید'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputRow}>
                                <SelectBox 
                                    label='نقش کاربری' 
                                    options={[
                                        {label: 'انباردار', value: 1},
                                        {label: 'ادمین', value: 2}
                                    ]} 
                                    value={role}
                                    onChange={(e) => {setRole(e.target.value);}}
                                    className={'w-full'}
                                />
                            </div>

                            <button onClick={createUser} className="btn primary-btn">
                                ثبت کاربر
                            </button>

                        </div>
                    </ModalCp>
                )}

            </div>
        </div>
    )
}