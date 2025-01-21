import {$host} from "./index";

export const fetchData = async (body) => {
    const {data} = await $host.post('api/bot/web-data', body)
    return data
}