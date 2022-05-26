import React from 'react'
import {
    BrowserRouter,
    Routes, 
    Route
} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Error404 from './components/Error404'


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/api/home' element={<Home />}/>
                    <Route path='/api/login' element={<Login />}/>
                    <Route path='/api/register' element={<Register />}/>
                    <Route path='*' element={<Error404 />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App