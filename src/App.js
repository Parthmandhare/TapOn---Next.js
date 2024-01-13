import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Update from './Update';
import Landing from './Landing';
import Profile from './Profile';

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        
            <Route path='/dashboard' element={<Dashboard/>} />

            <Route path='/update' element={<Update/>} />
            
            <Route path='/profile/:id' element={<Profile/>} />

        </Routes>
       </BrowserRouter>
    </>
  );
}

export default App;