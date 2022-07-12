import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/reset.css';
import './assets/css/global.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Agenda from './pages/Agenda';

import PrivateRoute from './components/PrivateRoute';

import { UserProvider } from './contexts/UserContext';
import { UpdateProvider } from './contexts/UpdateContext';

function App() {
  return (
    <UserProvider>
    <UpdateProvider>  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/agenda' element={
          <PrivateRoute>
            <Agenda />
          </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
    </UpdateProvider>
    </UserProvider>
  );
}

export default App;
