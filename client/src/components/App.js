import React from 'react'
import {
    BrowserRouter,
    Routes, 
    Route
} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Error404 from './Error404'


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register />}/>
                    <Route path='*' element={<Error404 />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App