'use client'

// styles
import styles from '@/public/styles/dashboard.module.scss'

// components
import Table from '@/components/element/table/Table'
import React, { useState, useEffect } from "react";

import { get_products_list } from '@/app/lib/api/products/get_list';
import { store_product } from '@/app/lib/api/products/store_product';
import { delete_product } from '@/app/lib/api/products/delete_product';

import ModalCp from '@/components/element/modal/ModalCp';
import { LuX } from "react-icons/lu";
import SelectBox from '@/components/element/select-box/SelectBox';
import { LuTrash2 } from "react-icons/lu";
import BarcodeGenerator from '@/components/element/barcode-generator/BarcodeGenerator';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState("1");
    const [category, setCategory] = useState("درب آسانسور");
    const [barcode, setBarcode] = useState("");
    const [productId, setProductId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const downloadBarcode = () => {
        const svgElement = document.querySelector("#barcode-svg");
        if (!svgElement) {
            console.error("No SVG element found with the specified ID.");
            return;
        }

        const serializer = new XMLSerializer();
        const svgBlob = new Blob([serializer.serializeToString(svgElement)], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${barcode}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    };

    const modalContent = (closeModal) =>
        selectedItem.value === "ویرایش" ? (
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>ویرایش</h2>
                <div className="flex flex-col gap-y-4 mt-6">
                    <div className={styles.inputRow}>
                        <label htmlFor="name">نام محصول</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="نام محصول را وارد کنید"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <label htmlFor="capacity">موجودی محصول</label>
                        <input 
                            type="text" 
                            id="capacity" 
                            placeholder="موجودی محصول را وارد کنید"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>
                    <div className={styles.selectRow}>
                        <label htmlFor="category">دسته بندی محصول</label>
                        <select
                            name="category"
                            id="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option>درب لولایی آسانسور</option>
                            <option>درب ضد حریق</option>
                            <option>درب ضد سرقت حیاطی</option>
                            <option>درب ضد سرقت آپارتمانی</option>
                        </select>
                    </div>
                    <button onClick={async () => {await updateProduct(); closeModal()}} className="btn primary-btn">
                        ویرایش محصول
                    </button>
                </div>
            </div>
        ) : selectedItem.value === "بارکد" ? (
            <div>
                {/* Barcode Generator with unique ID */}
                <BarcodeGenerator productNumber={barcode} id="barcode-svg" />
                <button className="primaryButton" onClick={downloadBarcode}>
                    دانلود بارکد
                </button>
            </div>
        ) : selectedItem.value === "حذف" ? (
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>تغییر وضعیت</h2>
                <div className="flex flex-col gap-y-4 mt-6">
                    <div className={styles.selectRow}>
                    <SelectBox 
                        label='وضعیت محصول' 
                        options={[
                            {label: 'فعال', value: 1},
                            {label: 'غیرفعال', value: 0}
                        ]} 
                        value={status}
                        onChange={(e) => {setStatus(e.target.value);}}
                        className={'w-full'}
                    />
                    </div>
                    <button onClick={async () => {
                        await delete_product(productId, status)
                        await getProducts()
                        closeModal()
                    }
                    } className="btn primary-btn">
                        تغییر وضعیت
                    </button>
                </div>
            </div>
        ) : (
            <div>
                <h1>هیچ موردی انتخاب نشده</h1>
                <p>لطفاً یک مورد انتخاب کنید.</p>
            </div>
        );

    const getProducts = async () => {
        try {
            let response = await get_products_list(searchName, searchCategory);
            if (response.status === 200) {
                setProducts(response.items);
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const createProduct = async () => {
        try {
            let response = await store_product(name, category);
            if (response.status === 200) {
                setIsCreateModalOpen(false);
                setName("");
                await getProducts();
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const updateProduct = async () => {
        try {
            let response = await store_product(name, category, capacity, productId);
            if (response.status === 200) {
                setName("");
                setCapacity("")
                handleCloseModal();
                await getProducts();
            } else {
                throw console.error(response.message);
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-y-10 px-2 md:px-0">
                <div>
                    <button onClick={() => setIsCreateModalOpen(true)} className="btn primary-btn">
                        ایجاد محصول
                    </button>
                </div>
                <div className="flex flex-col gap-y-6">
                    <div className={styles.inputRow}>
                        <label htmlFor="name">نام محصول</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="نام محصول را وارد کنید"
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <div className={styles.selectRow}>
                        <label htmlFor="category">دسته بندی محصول</label>
                        <select name="category" id="category" className='w-full' onChange={(e) => setSearchCategory(e.target.value)}>
                            <option value="">تمامی دسته ها</option>
                            <option>درب لولایی آسانسور</option>
                            <option>درب ضد حریق</option>
                            <option>درب ضد سرقت حیاطی</option>
                            <option>درب ضد سرقت آپارتمانی</option>
                        </select>
                    </div>
                    <button onClick={getProducts} className="btn primary-btn">
                        فیلتر محصولات
                    </button>
                </div>
                {products.length > 0 ? (
                    <Table
                        columns={[
                            { header: "ردیف", key: "id" },
                            { header: "نام محصول", key: "name" },
                            { header: "دسته بندی", key: "category" },
                            { header: " بارکد", key: "barcode" },
                            { header: "ظرفیت", key: "capacity" },
                            { header: "وضعیت", key: "status" },
                            { header: " ...", key: "actions" },
                        ]}
                        data={products}
                        dropdownOptions={[
                            { value: "ویرایش", name: "ویرایش" },
                            { value: "بارکد", name: "ایجاد بارکد" },
                            { value: "حذف", name: "تغییر وضعیت" },
                        ]}
                        onDropDataChange={(item, option) => {
                            setSelectedItem(option);
                            setName(item.name);
                            setCategory(item.category);
                            setProductId(item.id);
                            setBarcode(item.barcode);
                            setCapacity(item.capacity)
                        }}
                        modalContent={modalContent}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                ) : (
                    <div className="text-center">داده ای یافت نشد</div>
                )}
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
                                    placeholder="نام محصول را وارد کنید"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={styles.selectRow}>
                                <label htmlFor="category">دسته بندی محصول</label>
                                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                                    <option>درب لولایی آسانسور</option>
                                    <option>درب ضد حریق</option>
                                    <option>درب ضد سرقت حیاطی</option>
                                    <option>درب ضد سرقت آپارتمانی</option>
                                </select>
                            </div>
                            <button onClick={createProduct} className="btn primary-btn">
                                ثبت محصول
                            </button>
                        </div>
                    </ModalCp>
                )}
            </div>
        </div>
    );
}
