import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneCloth} from "../../http/clothAPI";
import Button from "../Button/Button";
import './Cloth.css'
import {fetchAddToBasket, fetchDestroyFromBasket} from "../../http/basketApi";
import {useTelegram} from "../../hooks/useTelegram";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ClothPage = observer(() => {
    const {basket} = useContext(Context)
    const {id} = useParams()
    const {user, onToggleButton} = useTelegram()
    const navigate = useNavigate()

    let userName = user?.username || 'sandaze'

    const [cloth, setCloth] = useState('')
    let [isAdded, setIsAdded] = useState(false)

    let [selectedSize, setSelectedSize] = useState("M")

    useEffect(() => {
        const itemInBasket = basket.clothes.some(item => {
            return item.clother_id === cloth.id && item.name === userName && item.size === selectedSize
        });
        setIsAdded(itemInBasket); // Если товар есть в корзине, устанавливаем isAdded в true
    }, [selectedSize])

    useEffect(() => {
        fetchOneCloth(id).then(data => {
            setCloth(data)
        })
    }, [])

    useEffect(() => {
        const itemInBasket = basket.clothes.some(item => {
            return item.clother_id === cloth.id && item.name === userName && item.size === selectedSize
        });
        setIsAdded(itemInBasket); // Если товар есть в корзине, устанавливаем isAdded в true
    }, [basket.clothes, cloth])

    if(!cloth) return false

    const onAdd = () => {
        setIsAdded(!isAdded)

        if(!isAdded) {
            fetchAddToBasket(userName, id, selectedSize).then(data => {
                basket.addCloth(data)
                onToggleButton(true)
            })
        }else {
            fetchDestroyFromBasket(userName, id, selectedSize).then(data => {
                basket.removeCloth(userName, id, selectedSize)
                if(basket.clothes.length === 0) onToggleButton(false)
            })
        }
    }

    return (
        <div className={'cloth'}>
            <div className="cloth__container">
                <div className="cloth-imgBx -ibg">
                    <img src={process.env.REACT_APP_API_URL + cloth.img} alt=""/>
                </div>
                <div className="cloth-main">
                    <div className="cloth__title">{cloth.name}</div>
                    <div className="cloth-characters">
                        <div className="cloth-characters__item">
                            <div className="cloth-characters__item-title">Размеры</div>
                            <div className="cloth-characters-sizes">
                                {cloth.sizes.map(el =>  <span onClick={() => setSelectedSize(el)} className={selectedSize === el ? 'active' : ''} key={el}>{el}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cloth-panel">
                <div className="cloth__price">{cloth.price.toLocaleString('ru')} ₽</div>
                <Button onClick={onAdd} className={`add-btn ${isAdded && 'added'}`}>
                    {isAdded ? (
                        'Удалить'
                    ) : (
                        <>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.3125 8.59375H13.2812V1.5625C13.2812 0.699707 12.5815 0 11.7188 0H10.1562C9.29346 0 8.59375 0.699707 8.59375 1.5625V8.59375H1.5625C0.699707 8.59375 0 9.29346 0 10.1562V11.7188C0 12.5815 0.699707 13.2812 1.5625 13.2812H8.59375V20.3125C8.59375 21.1753 9.29346 21.875 10.1562 21.875H11.7188C12.5815 21.875 13.2812 21.1753 13.2812 20.3125V13.2812H20.3125C21.1753 13.2812 21.875 12.5815 21.875 11.7188V10.1562C21.875 9.29346 21.1753 8.59375 20.3125 8.59375Z" fill="black"/>
                            </svg>
                            Добавить
                        </>
                    )}
                </Button>
            </div>

        </div>
    );
});

export default ClothPage;