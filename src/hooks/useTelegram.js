const tg = window.Telegram.WebApp
export function useTelegram () {
    const onClose = () => {
        tg.close()
    }
    const onToggleButton= () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else{
            tg.MainButton.show()
        }
    }
    return {
        onToggleButton,
        onClose,
        tg,
        user: tg.initDataUnsafe?.user,
        query_id: tg.initDataUnsafe?.query_id,
    }
}