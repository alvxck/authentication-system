import '../App.css';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../utils/register-user';
import { registrationForm } from '../types/types';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // User registration
    async function register(event: FormEvent) {
        const form: registrationForm = {
            name: name,
            email: email,
            password: password
        }

        let status = await registerUser(event, form);
    }
    
    // Password visibility
    const togglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <div className='main'>
            <form onSubmit={register}>
                <h1>Register</h1>
                <label>Name</label>
                <input
                    placeholder='Name'
                    value={name}
                    onChange={(x) => setName(x.target.value)}
                    type='text'
                />
                <label>Email</label>
                <input
                    placeholder='Email'
                    value={email}
                    onChange={(x) => setEmail(x.target.value)}
                    type='email'
                />
                <label>Password</label>
                <input
                    placeholder='password'
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
                <label>Already have an account?
                    <Link to='/login'>Login</Link>
                </label>
            </form>
        </div>
    )
}