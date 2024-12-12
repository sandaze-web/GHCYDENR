import React from 'react';
import Button from "../Button/Button";

const Header = (props) => {
    const tg = window.Telegram.WebApp

    const onClose = () => {
        tg.close()
    }
    return (
        <header className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>
        </header>
    );
};

export default Header;