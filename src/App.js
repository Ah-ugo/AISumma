// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import HomeLayout from './Layout/HomeLayout';
import Home from './pages/Home';
import AuthContainer from './pages/AuthContainer';
import PageTemp from './pages/PageTemp';
import { ChakraProvider } from '@chakra-ui/react';
import ContextProvider from './context/Context';
import TestImage from './pages/TestImage';
import MainPage from './pages/MainPages/Main';

function App() {
  return (
    <ContextProvider>
    <ChakraProvider>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthContainer/>}/>
        {/* <Route element={<HomeLayout/>}> */}
          <Route path='/' element={<MainPage/>}/>
          <Route path='/home' element={<PageTemp/>}/>
          <Route path='/img' element={<TestImage/>}/>
        {/* </Route> */}

      </Routes>
      </BrowserRouter>
    </div>
    </ChakraProvider>
    </ContextProvider>
  );
}

export default App;
