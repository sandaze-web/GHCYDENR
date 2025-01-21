import {BASKET_ROUTE, CLOTH_ROUTE, OFFER_ROUTE, SHOP_ROUTE} from "./utils/const";
import Shop from "./components/Pages/Shop";
import ClothPage from "./components/Pages/ClothPage";
import Basket from "./components/Basket/Basket";
import Offer from "./components/Pages/Offer/Offer";

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: OFFER_ROUTE,
        Component: Offer
    },
    {
        path: CLOTH_ROUTE + '/:id',
        Component: ClothPage
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]