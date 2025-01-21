import {$addresses} from "./index";

export const fetchAddresses = async (body) => {

    console.log(process.env.REACT_APP_ADDRESSES_API_URL)
    const {data} = await $addresses.post('', body)
    return data
}