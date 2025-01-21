const tg = window.Telegram.WebApp
export function useCheckLocationBasket () {
    if(/^\/basket(\/.*)?$/.test(location.pathname)) return true
}