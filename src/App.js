import './App.css';
import './reset.css'
import {useContext, useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, useLocation, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {fetchBasketClothes} from "./http/basketApi";
import {useCheckLocation} from "./hooks/useCheckLocation";


const App = observer(() => {
    const {tg, user} = useTelegram()
    const {cloth, basket} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        tg.ready()
        if(useCheckLocation('basket')) {
            tg.MainButton.setParams({
                text: `Оформить заказ`
            })
            tg.MainButton.show()
            console.log('show')
        }else if(useCheckLocation('offer')){
            tg.MainButton.hide()
            console.log('hide')
        }else{
            tg.MainButton.setParams({
                text: `Корзина`
            })
            tg.MainButton.show()
            console.log('show')
        }
    }, [])

    const updateMainButtonText = (text) => {
        tg.MainButton.setParams({ text });
    };

    const onHome = () => {
        updateMainButtonText('Корзина')
        navigate('/')
    }

    const navigateToPage = () => {
        if (useCheckLocation('basket')) {
            tg.MainButton.setParams({
                text: `Оформить заказ`
            })
            navigate('/offer') // страница оформление заказа
        }else{
            tg.MainButton.setParams({
                text: `Оформить заказ`
            })
            navigate('/basket')
        }
    }

    useEffect(() => {
        // показываем кнопку назад в случае, если находимся НЕ на главной
        if (location.pathname === '/') {
            tg.BackButton.hide()
        } else {
            tg.BackButton.show()
        }
    }, [location.pathname]);

    useEffect(() => {
        let userName = user?.username || 'sandaze'
        fetchBasketClothes(userName).then(data => {
            basket.setClothes(data)
        })
    }, [])

    useEffect(() => {
        if(basket.clothes.length === 0 || useCheckLocation('offer')) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            if(!useCheckLocation('basket')){
                tg.MainButton.setParams({
                    text: `Корзина`
                })
            }
        }
    }, [basket.clothes, location.pathname])

    useEffect(() => {
        //обработка нажатия на кнопки телеграма Назад и Главной кнопки снизу
        tg.onEvent('mainButtonClicked', navigateToPage);
        tg.onEvent('backButtonClicked', onHome); //при клике на кнопку назад всегда ведет на главную/каталог

        return () => {
            tg.offEvent('mainButtonClicked', navigateToPage);
            tg.offEvent('backButtonClicked', onHome);
        }
    }, [location.pathname]);

    return (
        <div className="App">
            {/*<Header />*/}
            <AppRouter/>
        </div>
    );
})

export default App;
