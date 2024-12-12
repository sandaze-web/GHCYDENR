import './App.css';
import './reset.css'
import {useEffect} from "react";
const tg = window.Telegram.WebApp


function App() {

    useEffect(() => {
        tg.ready()
    }, [])

    const onClose = () => {
        tg.close()
    }
  return (
    <div className="App">
      тест
        <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
