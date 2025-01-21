import {$host} from "./index";

export const fetchAddToBasket = async (userName, id_cloth, size = null) => {
    const {data} = await $host.post('api/basket/add', {userName, id_cloth, size})
    return data
}
export const fetchDestroyFromBasket = async (userName, id_cloth, size = null) => {
    const {data} = await $host.post('api/basket/delete', {userName, id_cloth, size})
    return data
}
export const fetchBasketClothes = async (userName) => {
    const {data} = await $host.get('api/basket', {params: {userName}})
    return data
}