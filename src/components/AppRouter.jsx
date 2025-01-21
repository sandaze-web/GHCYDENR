import React, {useContext, useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useTelegram} from "../hooks/useTelegram";

const AppRouter = observer(() => {
    return (

        <Routes>
            {publicRoutes.map((el) =>  <Route key={el.path} path={el.path} element={<el.Component />} /> )}
        </Routes>
    );
});

export default AppRouter;
