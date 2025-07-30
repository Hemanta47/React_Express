import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {

  return (
    // <RegisterForm />
    <>
      <div className='p-1.5 h-full w-full'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='*' element={<div>404 Not Found</div>}></Route>
        </Routes>
      </div>

    </>

  )
}

export default App