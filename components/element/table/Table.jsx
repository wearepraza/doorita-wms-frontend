'use client'

import React, { useState } from "react";
import styles from "./table.module.scss";
import ModalCp from "../modal/ModalCp";
import Pagination from "./paging/Paging";
import { LuX } from "react-icons/lu";
import Dropdown from "../drop_list/Dropdown";

const getStatusClass = (status) => {
  switch (status) {
    case "تائید":
      return styles.statusPublished;
    case "نامشخص":
      return styles.statusDraft;
    case "در انتظار تائید":
      return styles.statusLowStock;
    case "عدم تائید":
      return styles.statusCancelled;
    default:
      return "";
  }
};

const Table = ({
  columns,
  data = [],
  itemsPerPage = 10,
  modaltitle,
  modaldec,
  CustomerModal = null,
  dropdownOptions,
  modalContent = null, // Default to null
  onSelectItem = () => {},
  onDropDataChange = () => {},
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropDataState, setDropDataState] = useState(null);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting product:", selectedProduct);
    // TODO: Implement delete logic

    setIsDeleteModalOpen(false);
  };

  const openModal = () => {
    if (CustomerModal) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedItems(checked ? data.map((item) => item.id) : []);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const formatCurrency = (value) => {
    value = Number(value);
    if (typeof value === "number" && value % 1000 === 0) {
      return value.toLocaleString("fa-IR");
    }
    return value;
  };

  const isChecked = (id) => selectedItems.includes(id);

  const validItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 10;
  const totalPages = data.length ? Math.ceil(data.length / validItemsPerPage) : 1;
  const startIndex = (currentPage - 1) * validItemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + validItemsPerPage);

  const handleDropdownSelect = (value, item) => {
    const selectedOption = dropdownOptions.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedItem(selectedOption);
      onSelectItem(selectedOption);
      setDropDataState(item);
      onDropDataChange(item,selectedOption);

      if (selectedOption.href) {
        window.location.href = selectedOption.href;
      } else {
        setIsModalOpen(!isModalOpen);
      }
    }
  };

  const renderLink = (link) => {
    return <a href={link} target="_blank" rel="noopener noreferrer">مشاهده لینک</a>;
  };

  return (
    <div className={styles.tableContainer}>
      <table id="productTable">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.key === "actions" ? (
                    <Dropdown
                      options={dropdownOptions}
                      onSelect={(value) => handleDropdownSelect(value, item)}
                    />
                  ) : col.key === "status" ? (
                    <span className={`${styles.status} ${getStatusClass(item[col.key])}`}>
                      {col.formatter ? col.formatter(item[col.key]) : item[col.key]}
                    </span>
                  ) : col.key === "price" ? (
                    formatCurrency(item[col.key])
                  ) : col.key === "link" ? (
                    renderLink(item[col.key])
                  ) : col.formatter ? (
                    col.formatter(item[col.key])
                  ) : (
                    item[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalCp isOpen={isModalOpen} onRequestClose={closeModal}>
          <div className={styles.modalHeader}>
            <button onClick={closeModal}>
              <LuX />
            </button>
          </div>
          {modalContent && modalContent(closeModal)}
        </ModalCp>
      )}
      {CustomerModal && (
        <CustomerModal isOpen={isModalOpen} closeModal={closeModal} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={validItemsPerPage}
        totalItems={data.length}
      />
    </div>
  );
};

export default Table;