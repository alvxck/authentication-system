import '../App.css';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../utils/fetch-login';
import { loginForm } from '../types/types';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // User login
    async function login(event: FormEvent) {
        const form: loginForm = {
            email: email,
            password: password
        }

        let status = loginUser(event, form);
    }

    // Password visibility
    const togglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <div className='main'>
            <form onSubmit={login}>
                <h1>Login</h1>
                <label>Email</label>
                <input
                    placeholder='Email'
                    value={email}
                    onChange={(x) => setEmail(x.target.value)}
                    type='email'
                />
                <label>Password</label>
                <input
                    placeholder='Password'
                    value={password}
                    onChange={(x) => setPassword(x.target.value)}
                    type={showPassword ? 'text' : 'password'}
                />
                <div>
                    <input
                        type='checkbox'
                        checked={showPassword}
                        onChange={togglePassword}
                    />
                    <label> Show Password</label>
                </div>
                <label>{error}</label>
                <input 
                    type='submit'
                    value='Register'
                />
                <label>Don't have an account?
                    <Link to='/register'>Register</Link>
                </label>
            </form>
        </div>
    )
}