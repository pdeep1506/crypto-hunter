
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import HeaderCompo from './Components/Header/HeaderCompo'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'

function App() {
  
  return (
    <BrowserRouter>
      <div className='app'>
      <HeaderCompo></HeaderCompo>
    
      <Routes>
      
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/coins/:id' element={<CoinPage></CoinPage>}></Route>
      
      </Routes>

      </div>
    
    
    </BrowserRouter>
  );
}

export default App;
