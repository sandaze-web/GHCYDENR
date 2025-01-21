import React, {useContext, useState} from 'react';
import './ProductList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import Product from "./Product/Product";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const products = [
    {id: '1', title: 'Футболка OVERSIZE «КАЙФ»', price: 2699, src: '1.jpg'},
    {id: '2', title: 'Худи OVERSIZE «ЖИЗНЬ»', price: 3299, src: '2.jpg'},
    {id: '3', title: 'Футболка OVERSIZE «МЕЧТА»', price: 2199, src: '3.jpg'},
    {id: '4', title: 'Шоппер «КАЙФ»', price: 990, src: '4.jpg'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList =  observer(() => {
    const {cloth} = useContext(Context)

    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    // const onSendData = useCallback(() => {
    //     const data = {
    //         products: addedItems,
    //         totalPrice: getTotalPrice(addedItems),
    //         queryId,
    //     }
    //     fetch('http://85.119.146.179:8000/web-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }, [addedItems])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)
    }

    return (
        <div className={'products-box'}>
            {cloth.clothes.map(cloth => (
                <Product
                    key={cloth.id}
                    cloth={cloth}
                    onAdd={onAdd}
                    className={'product-item'}
                />
            ))}
        </div>
    );
});

export default ProductList;