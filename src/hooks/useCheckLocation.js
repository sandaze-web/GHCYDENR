const tg = window.Telegram.WebApp
export function useCheckLocation (path) {
    if(new RegExp(`^\\/${path}(\\/.*)?$`).test(location.pathname)) return true
}