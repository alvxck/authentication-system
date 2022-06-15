import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css';


function Error() {
    const navigate = useNavigate()

    return (
        <div className='error--overlay'>
            <div className='error--container'>
                <h1 className='error--header'>Error404: Page not found.</h1> 
                <input
                    className='button' 
                    onClick={() => navigate('/api/register')}
                    type='submit'
                    value='Register ↗'
                />
                <input
                    className='button'
                    onClick={() => navigate('/api/login')}
                    type='submit'
                    value='Login ↗'
                />
            </div>
        </div>
    )

}

export default Error;

