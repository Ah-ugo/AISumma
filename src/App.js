// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeLayout from './Layout/HomeLayout';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
