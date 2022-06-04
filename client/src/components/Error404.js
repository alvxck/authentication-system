import React from 'react'
import { Link } from 'react-router-dom'
import style from '../assets/css/Error404.module.css'


function Error() {
    return (
        <div className={style.overlay}>
            <div className={style.contentContainer}>
                <h1 className={style.header}><i>Error404: </i>Page not found.</h1> 
                <br/>
                <Link className={style.textLink} to='/api/login'>Login ↗</Link>
                <br/>
                <Link className={style.textLink} to='/api/register'>Register ↗</Link>
            </div>
        </div>
    )

}

export default Error;

