import {$host} from "./index";

export const fetchClothes = async (page, limit= 5) => {
    const {data} = await $host.get('api/cloth', {params: {
            page, limit
        }})
    return data
}

export const fetchOneCloth = async (id) => {
    const {data} = await $host.get('api/cloth/' + id)
    return data
}
