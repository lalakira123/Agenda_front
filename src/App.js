import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/reset.css';
import './assets/css/global.css';

import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/signup'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
