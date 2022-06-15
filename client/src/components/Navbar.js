import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Navbar.module.css'
import homeIcon from '../images/home-icon.png'
import settingsIcon from '../images/settings-icon.png'
import logoutIcon from '../images/logout-icon.png'


function Navbar(props) {
    const navigate = useNavigate();

    function logout() {
        alert('logout succesful.')
        localStorage.removeItem('token');
        navigate('/api/login');
    }

    return(
        <div className={style.navbar}>
            <img 
                className={style.navbarIconHeader}
                src={homeIcon}
                alt='home'
            />
            <h1 className={style.header}>Welcome {props.username}</h1>

            <input
                className={style.button} 
                onClick={props.onClick}
                type='submit'
                value='Settings'
            />
            <img 
                className={style.navbarIcon}
                src={settingsIcon}
                alt='settings'
            />

            <input
                className={style.button} 
                onClick={logout}
                type='submit'
                value='Logout'
            />
            <img 
                className={style.navbarIcon}
                src={logoutIcon}
                alt='logout'
            />
        </div>
    );
}

export default Navbar;