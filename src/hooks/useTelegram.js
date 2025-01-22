const tg = window.Telegram.WebApp
export function useTelegram () {
    const onClose = () => {
        tg.close()
    }
    const onToggleButton= (isShow) => {
        if(isShow) {
            tg.MainButton.show()
        } else{
            tg.MainButton.hide()
        }
    }
    return {
        onToggleButton,
        onClose,
        tg,
        user: tg.initDataUnsafe?.user,
        query_id: tg.initDataUnsafe?.query_id,
        chat_id: tg.initDataUnsafe?.user.id
    }
}