import React, {useContext, useEffect, useRef, useState} from 'react';
import ValidatedInput from "../../ValidatedInput/ValidatedInput";
import './Offer.css'
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import InputMask from "@mona-health/react-input-mask";
import AddressesInput from "../../AddressesInput/AddressesInput";
import {useTelegram} from "../../../hooks/useTelegram";
import {fetchData} from "../../../http/botTelegramApi";


const Offer = observer(() => {
    const {basket} = useContext(Context)
    const {tg, query_id} = useTelegram()

    const formRef = useRef()

    const accumulatePrice = () => {
        return basket.clothes.reduce((sum, item) => sum + item.clother.price, 0);
    }

    useEffect(() => {
        //обработка нажатия на кнопки телеграма Назад и Главной кнопки снизу
        tg.onEvent('mainButtonClicked', sendFormData);

        return () => {
            tg.offEvent('mainButtonClicked', sendFormData);
        }
    }, );

    const sendFormData = (event) => {
        event.preventDefault(); // Предотвращаем отправку формы
        const form = formRef.current;

        if (form.checkValidity()) {
            // отправляем данные куда то, и отправляем сообщение пользователю через бот
            const data = {
                products: basket.clothes,
                totalPrice: accumulatePrice(),
                query_id,
            }
            fetchData(JSON.stringify(data)).then((data) => {
                console.log('отправил')
            })
        } else {
            form.reportValidity();
        }
    };

    return (
        <section className={'basket'}>
            <form ref={formRef} className="basket__container">
                <div className="offer-wrapper">
                    <div className="basket__title">Получатель</div>
                    <div className="offer-box">
                        <div className="offer-inputBx">
                            <ValidatedInput
                                placeholder="Фамилия"
                                required
                                errorMessage="Введите фамилию"
                            />
                        </div>
                        <div className="offer-inputBx">
                            <ValidatedInput
                                placeholder="Имя"
                                required
                                errorMessage="Введите имя"
                            />
                        </div>
                        <div className="offer-inputBx">
                            <ValidatedInput
                                placeholder="Отчество"
                                required
                                errorMessage="Введите отчество"
                            />
                        </div>
                    </div>
                </div>
                <div className="offer-wrapper">
                    <div className="basket__title">Адрес пункта выдачи CDEK</div>
                    <div className="offer-box">
                        <div className="offer-inputBx addresses">
                            <AddressesInput />
                        </div>
                    </div>
                </div>
                <div className="offer-wrapper">
                    <div className="basket__title">Комментарий к заказу</div>
                    <div className="offer-box">
                        <div className="offer-inputBx">
                            <textarea name="" id="" cols="30" rows="3" placeholder={"Ваш комментарий"}></textarea>
                        </div>
                    </div>
                </div>
                <div className="offer-wrapper">
                    <div className="offer-counts">
                        <div className="offer-counts__item">
                            <span>Общая стоимость заказа: </span><span>{accumulatePrice().toLocaleString('ru')} ₽</span>
                        </div>
                        <div className="offer__notice">Вы оформляете заказ, после чего, с вами свяжется менеджер для уточнения деталей заказа. В сумму заказа не включена стоимость доставки.</div>
                    </div>
                </div>
            </form>
        </section>
    );
});

export default Offer;