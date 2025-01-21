import React, { useState } from 'react';
import InputMask from "@mona-health/react-input-mask";

const ValidatedInput = ({ type = "text", placeholder, required = false, pattern, errorMessage, onValidate }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const validate = (value) => {
        if (required && value.trim() === "") {
            setError("Заполните поле");

            return false;
        }
        if (pattern && !new RegExp(pattern).test(value.trim())) {
            setError(errorMessage || "Некорректно введены данные");

            return false;
        }
        setError("");

        return true;
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        // validate(newValue);
    };

    const handleBlur = () => {
        validate(value);
    };

    const renderInput = () => {
        if (type === 'tel') {
            return (
                <InputMask
                    mask="+7 (999) 999-99-99" // Маска для телефона
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    required={required}
                />
            );
        }

        return (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                required={required}
            />
        );
    };

    return (
        <div className={`validated-input ${error && 'error'}`}>
            {renderInput()}
        </div>
    );
};

export default ValidatedInput;
