import React from 'react';
import PropTypes from 'prop-types';
import { LuChevronDown } from "react-icons/lu";
import styles from './selectBox.module.scss';

const SelectBox = ({ label, options,className,value,onChange }) => {
  return (
    <div className={`${styles.selectBoxContainer} ${className}`}> 

      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectBox}>
        <div className={styles.icon}><LuChevronDown/></div>
      <select value={value} onChange={onChange}>
          <option value="" disabled hidden>انتخاب... </option>
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SelectBox;
