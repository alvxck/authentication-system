import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../assets/css/Error404.module.css'


function Error() {
    const navigate = useNavigate()

    return (
        <div className={style.overlay}>
            <div className={style.contentContainer}>
                <h1 className={style.header}>Error404: Page not found.</h1> 
                <input
                    className={style.button} 
                    onClick={() => navigate('/api/register')}
                    type='submit'
                    value='Register ↗'
                />
                <input
                    className={style.button} 
                    onClick={() => navigate('/api/login')}
                    type='submit'
                    value='Login ↗'
                />
            </div>
        </div>
    )

}

export default Error;

