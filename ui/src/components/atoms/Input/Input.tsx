import React from "react";
import "./input.styles.scss";

export interface InputProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value = "",
  onChange,
  disabled = false,
  className = "",
  label,
  error,
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  const inputClasses = `tooliv-input ${className}`.trim();

  return (
    <div className="tooliv-input-wrapper">
      {label && (
        <label htmlFor={inputId} className="tooliv-input__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
      {error && <p className="tooliv-input__error">{error}</p>}
    </div>
  );
};
