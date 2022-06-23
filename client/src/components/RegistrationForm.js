import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './RegistrationForm.module.css'

function RegistrationForm() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    // POST HTTP request to create user account
    async function registerUser(event) {
        event.preventDefault()

        try {
            const res = await fetch('http://localhost:1337/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            const data = await res.json()

            // Update page based on response status
            if (res.status === 201) {
                navigate('/api/login')
            }
    
            if (res.status === 409) {
                setError(data.error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Change password visibility
    function togglePassword() {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <div className={style.contentContainer}>
            <h1 className={style.header}>Sign Up</h1>
            <form onSubmit={registerUser} className={style.formContainer}>
                <label className={style.text}>Name</label>
                <input
                    className={style.input}
                    placeholder='Enter Name'
                    value={name}
                    onChange={(x) => setName(x.target.value)}
                    type='text' 
                />

                <label className={style.text}>Email</label>
                <input 
                    className={style.input}
                    placeholder='Enter Email'
                    value={email}
                    onChange={(x) => setEmail(x.target.value)}
                    type='email' 
                />

                <label className={style.text}>Password</label>
                <input 
                    className={style.input}
                    placeholder='Enter Password'
                    value={password}
                    onChange={(x) => setPassword(x.target.value)}
                    type={showPassword ? 'text': 'password'} 
                />

                <div>
                    <input
                        className={style.checkBox}
                        type='checkbox'
                        checked={showPassword}
                        onChange={togglePassword}
                    />
                    <label className={style.text}> Show Password</label>
                </div>

                <label className={style.textError}>{error}</label>
                <input 
                    className={style.button}
                    type='submit'
                    value='Register'
                />
                <label className={style.textFooter}>Already have an account?
                    <Link className={style.textLink} to='/api/login'>Login</Link>
                </label>
            </form>
        </div>
    )
};

export default RegistrationForm;