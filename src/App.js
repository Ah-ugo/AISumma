// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import HomeLayout from './Layout/HomeLayout';
import Home from './pages/Home';
import AuthContainer from './pages/AuthContainer';
import PageTemp from './pages/PageTemp';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthContainer/>}/>
        <Route element={<HomeLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<PageTemp/>}/>
        </Route>

      </Routes>
      </BrowserRouter>
    </div>
    </ChakraProvider>
  );
}

export default App;
