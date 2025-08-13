import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import CreateQuesSetPage from './Pages/QuestionSet/CreateQuesSetPage';

export interface IAuthContext {
  isAuth: boolean,
  setAuthState: React.Dispatch<React.SetStateAction<{
    isAuth: boolean;
  }>>
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setAuthState: () => { }
});


function App() {
  const [authState, setAuthState] = useState({
    isAuth: false,

  })

  useEffect(() => {
    const accessToken = localStorage.getItem("token")

    async function fetchData() {
      await axios.get("http://localhost:3000/api/verify/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => {
          setAuthState((prev) => ({
            ...prev,
            isAuth: true
          }))
        })
        .catch(error => { })
    }

    fetchData()
  }, [])

  return (
    // <RegisterForm />
    <>
      <AuthContext.Provider
        value={{
          isAuth: authState.isAuth,
          setAuthState
        }}
      >


        <div className='h-full w-full flex flex-col'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/admin/questionset/create' element={<CreateQuesSetPage />}></Route>
            <Route path='*' element={<div>404 Not Found</div>}></Route>
          </Routes>
        </div>
      </AuthContext.Provider>
    </>

  )
}

export default App