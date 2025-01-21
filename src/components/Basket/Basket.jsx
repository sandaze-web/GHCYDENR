import React, {useContext, useEffect} from 'react';
import './Basket.scss'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import BasketItem from "./BasketItem/BasketItem";
import {fetchBasketClothes, fetchDestroyFromBasket} from "../../http/basketApi";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate} from "react-router-dom";

const Basket = observer(() => {
    const {basket} = useContext(Context)
    const {user} = useTelegram()
    const navigate = useNavigate()

    useEffect(() => {
        debugger
        let userName = user?.username || 'sandaze'
        fetchBasketClothes(userName).then(data => {
            basket.setClothes(data)
        })
    }, [])

    if(basket.clothes.length === 0){
        return (
            <section className={'basket'}>
                <div className="basket__container">
                    <div className="basket-inner">
                        <div className="basket__title">Корзина <button onClick={() => navigate('/')} className={'add-btn'}>Каталог</button></div>
                        <div className="basket__acc">
                            <span>Итого:</span><span>0 ₽</span>
                        </div>
                    </div>
                </div>
            </section>
        )
    }else {
        const accumulatePrice = () => {
            return basket.clothes.reduce((sum, item) => {
                if(!item.clother) return 0
                return sum + item.clother.price
            }, 0);
        }

        const deleteCloth = (clother_id, size) => {
            let userName = user?.username || 'sandaze'
            fetchDestroyFromBasket(userName, clother_id, size).then(data => {
                basket.removeCloth(userName, clother_id, size)
            })
        }

        return (
            <section className={'basket'}>
                <div className="basket__container">
                    <div className="basket-inner">
                        <div className="basket__title">Корзина</div>
                        <div className="basket-box">
                            {basket.clothes.map(el => <BasketItem deleteCloth={deleteCloth} cloth={el} />)}
                        </div>
                        <div className="basket__acc">
                            <span>Итого:</span><span>{accumulatePrice().toLocaleString('ru')} ₽</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

export default Basket;