import React from 'react';
import style from './Login.module.css';
import LoginForm from '../components/LoginForm';


function Login() {
    return (
        <div className={style.overlay}>
            <LoginForm />
        </div>
    )
};

export default Login;
