import React from 'react';
import style from './Register.module.css';
import RegistrationForm from '../components/RegistrationForm';

function Register() {
    return (
        <div className={style.overlay}>
            <RegistrationForm />
        </div>
    )
};

export default Register;
