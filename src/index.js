import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ClothStore from "./store/clothStore";
import BasketStore from "./store/basketStore";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)

root.render(
    <Context.Provider value={{
        basket: new BasketStore(),
        cloth: new ClothStore(),
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>,
);
