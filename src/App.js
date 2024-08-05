import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from './Layout/HomeLayout';
import Home from './pages/Home';
import AuthContainer from './pages/AuthContainer';
import PageTemp from './pages/PageTemp';
import { ChakraProvider } from '@chakra-ui/react';
import ContextProvider from './context/Context';
import TestImage from './pages/TestImage';
import MainPage from './pages/MainPages/Main';
import Login from './pages/newAuth/Login';
import Register from './pages/newAuth/Register';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <ContextProvider>
      <ChakraProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<PrivateRoute><MainPage /></PrivateRoute>} />
              <Route path='/home' element={<PrivateRoute><PageTemp /></PrivateRoute>} />
              <Route path='/img' element={<PrivateRoute><TestImage /></PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </ContextProvider>
  );
}

export default App;
