import {$addresses} from "./index";

export const fetchAddresses = async (body) => {
    const {data} = await $addresses.post('', body)
    return data
}