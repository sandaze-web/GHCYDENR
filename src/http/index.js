import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $addresses = axios.create({
    baseURL: process.env.REACT_APP_ADDRESSES_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + process.env.REACT_APP_ADDRESSES_API_KEY,
    }
})

export {
    $host,
    $addresses
}