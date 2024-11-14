'use client'

// styles
import styles from '@/public/styles/dashboard.module.scss'

// components
import Table from '@/components/element/table/Table'
import React, { useState, useEffect, useRef } from "react";

import { get_products_list } from '@/app/lib/api/products/get_list';
import { store_product } from '@/app/lib/api/products/store_product';

import ModalCp from '@/components/element/modal/ModalCp';
import { LuX } from "react-icons/lu";
import SelectBox from '@/components/element/select-box/SelectBox';
import { LuTrash2, LuLoader2 } from "react-icons/lu";
import BarcodeGenerator from '@/components/element/barcode-generator/BarcodeGenerator';

export default function Dashboard () {
    const [products, setProducts] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [name, setName] = useState("");
    const [barcode, setBarcode] = useState("");
    const [productId, setProductId] = useState("");
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
                    <label htmlFor="name">نام محصول</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder='نام محصول را وارد کنید'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <button onClick={updateProduct} className="btn primary-btn">
                    ویرایش محصول
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
        ) 
        : selectedItem.value === "بارکد" ? (
            <BarcodeGenerator productNumber={barcode} />
        ): (
          <div>
            <h1>هیچ موردی انتخاب نشده</h1>
            <p>لطفاً یک مورد انتخاب کنید.</p>
          </div>
        );

    const dropdownOptions = [
        { value: "ویرایش", name: "ویرایش" },
        { value: "بارکد", name: "ایجاد بارکد" }
        // { value: "حذف", name: "حذف" }
    ];
    
    const columns = [
        { header: "ردیف", key: "id" },
        { header: "نام محصول", key: "name" },
        { header: " بارکد", key: "barcode" },
        { header: "ظرفیت", key: "capacity" },
        { header: "وضعیت", key: "status" },
        { header: " ...", key: "actions" },
    ];

    const getProducts = async () => {
        try {
            let response = await get_products_list()
            if (response.status === 200) {
                setProducts(response.items)
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    };

    const createProduct = async () => {
        try {
            let response = await store_product(name)
            if (response.status === 200) {
                setIsCreateModalOpen(false)
                setName("")

                await getProducts()
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    }

    const updateProduct = async () => {
        try {
            let response = await store_product(name, productId)
            if (response.status === 200) {
                setName("")
                handleCloseModal()

                await getProducts()
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            throw console.error(e.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);    

    return (
        <div>
            <div className='flex flex-col gap-y-10 px-2 md:px-0'>
                <div>
                    <button onClick={() => setIsCreateModalOpen(true)} className="btn primary-btn">
                        ایجاد محصول
                    </button>
                </div>

                {Object.keys(products).length > 0 ? (
                    <Table 
                        columns={columns} 
                        data={products} 
                        dropdownOptions={dropdownOptions} 
                        onDropDataChange={(item, option) => {setSelectedItem(option); setName(item.name); setProductId(item.id); setBarcode(item.barcode)}}
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
                                <label htmlFor="name">نام محصول</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder='نام محصول را وارد کنید'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <button onClick={createProduct} className="btn primary-btn">
                                ثبت محصول
                            </button>

                        </div>
                    </ModalCp>
                )}

            </div>
        </div>
    )
}