import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './LoginForm.module.css'

function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    // POST HTTP request to create JWT
    async function loginUser(event) {
        event.preventDefault()

        try {
            const res = await fetch('http://localhost:1337/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await res.json();
                
            // Update page based on response status
            if(res.status === 200) {
                localStorage.setItem('token', data.user)
                navigate(`/api/${data.username}`)
            } 
    
            if (res.status === 400 || res.status === 404) {
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
            <h1 className={style.header}>Login</h1>
                <form onSubmit={loginUser} className={style.formContainer}>
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
                        value='Login'
                    />

                    <label className={style.textFooter}>Don't have an account? 
                        <Link className={style.textLink} to='/api/register'>Register</Link>
                    </label>
                </form>
        </div>
    )
};

export default LoginForm;