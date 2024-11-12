
import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
const Dropdown = ({ options, onSelect,disabled }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  const handleClick = () => {
    setSelectedValue("");
  };

  return (
    <select
      className={styles.dropdown}
      value={selectedValue}
      onChange={handleSelect}
      onClick={handleClick}
      disabled={disabled}
    >
      <option className={styles.option} value="" disabled hidden>
        ﹀
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
