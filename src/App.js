import './App.css';
import './reset.css'
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";


function App() {
    const {tg, onToggleButton} = useTelegram()

    useEffect(() => {
        tg.ready()
    }, [])

  return (
    <div className="App">
        <Header />
        {/*<button onClick={onToggleButton}>toggle</button>*/}
        <Routes>
            <Route index element={<ProductList />} />
            <Route path={'repair'} element={<Form />} />
        </Routes>
    </div>
  );
}

export default App;
