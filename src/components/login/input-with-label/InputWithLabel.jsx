import "./InputWithLabel.css";
import React from "react";

export default function InputWithLabel({ value, label, onChange, type }) {
  return (
    <div className="InputWithLabel">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={label}
      />
    </div>
  );
}
