import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import ProductList from "../ProductList/ProductList";
import {Context} from "../../index";
import {fetchClothes} from "../../http/clothAPI";
import {fetchBasketClothes} from "../../http/basketApi";
import {useTelegram} from "../../hooks/useTelegram";

const Shop = observer(() => {
    const {cloth} = useContext(Context)
    const {user} = useTelegram()

    useEffect(() => {
        fetchClothes( 1, 10).then(data => {
            cloth.setClothes(data.rows)
            cloth.setTotalCount(data.count)
        })
    }, [])

    return (
        <ProductList />
    );
});

export default Shop;