import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error404.module.css'


function Error() {
    return (
        <div className={styles.overlay}>
            <div>
                <h1 className={styles.header}>Error404.</h1> 
                <p className={styles.text}>Page not found</p>
                <Link className={styles.textLink} to='/login'>Login ↗</Link>
                <br/>
                <Link className={styles.textLink} to='/register'>Register ↗</Link>
            </div>
        </div>
    )

}

export default Error;

