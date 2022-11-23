import './App.css';
import WatchList from './pages/watchList';
import {StockInfo} from './pages/stockinfo';
import {Routes,Route} from "react-router-dom";
import AutoCompelete from "./componets/autoCompelete"
import { WatchListContextProvider } from './context/watchListContext';

function App() {
  return (
    <div className="App">
      <WatchListContextProvider>
      <Routes>
      <Route path='/' element={<WatchList/>}></Route>
      <Route path='/stockinfo/:symbol' element={<StockInfo/>}></Route>
      </Routes>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
