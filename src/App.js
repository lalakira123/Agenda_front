import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/reset.css';
import './assets/css/global.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
