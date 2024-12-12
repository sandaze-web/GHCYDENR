import React from 'react';
import css from './ProductList.module.css'
import Product from "./Product/Product";

const ProductList = (props) => {
    return (
        <div className={css.box}>
            <Product />
            <Product />
            <Product />
        </div>
    );
};

export default ProductList;