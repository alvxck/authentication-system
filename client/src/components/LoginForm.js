import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './LoginForm.module.css'

function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('\u00A0')
    const [isDisplayPassword, setIsDisplayPassword] = useState(false)


    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()

        if(data.status === 'ok') {
            localStorage.setItem('token', data.user)
            navigate(`/api/${data.username}`)
        } 

        if (data.status === 'error') {
            setError(data.error)
        }
    }

    function togglePassword() {
        setIsDisplayPassword((isDisplayPassword) => !isDisplayPassword)
    }

    return (
        <div>
            <h1 className={style.header}>Login</h1>
            <div className={style.contentContainer}>
                <form onSubmit={loginUser}>
                    <label className={style.text}>Email</label>
                    <input 
                        className={style.input}
                        placeholder='Enter Email' 
                        value={email}
                        onChange={(x) => setEmail(x.target.value)}
                        type='email' 
                    />
                    <br/>    
                    <label className={style.text}>Password</label>
                    <input
                        className={style.input}
                        placeholder='Enter Password' 
                        value={password}
                        onChange={(x) => setPassword(x.target.value)}
                        type={isDisplayPassword ? 'text': 'password'} 
                    />
                    <br/>
                    <input
                        className={style.checkBox}
                        type='checkbox'
                        checked={isDisplayPassword}
                        onChange={togglePassword}
                    />
                    <label className={style.text}> Show Password</label>
                    <br/>
                    <label className={style.textError}>{error}</label>
                    <br/>
                    <input
                        className={style.button} 
                        type='submit'
                        value='Login'
                    />
                    <label className={style.textFooter}>Don't have an account? 
                        <br/><Link className={style.textLink} to='/api/register'>Register</Link>
                    </label>
                </form>
            </div>
        </div>
    )
};

export default LoginForm;