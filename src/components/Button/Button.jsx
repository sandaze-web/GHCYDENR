import React from 'react';
import css from './Button.module.css'

const Button = (props) => {
    return (
        <button {...props} className={`${props.className}`} />
    );
};

export default Button;