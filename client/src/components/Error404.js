import React from 'react'
import { Link } from 'react-router-dom'
import style from '../assets/css/Error404.module.css'


function Error() {
    return (
        <div className={style.overlay}>
            <div>
                <h1 className={style.header}>Error404.</h1> 
                <p className={style.text}>Page not found</p>
                <Link className={style.textLink} to='/api/login'>Login ↗</Link>
                <br/>
                <Link className={style.textLink} to='/api/register'>Register ↗</Link>
            </div>
        </div>
    )

}

export default Error;

