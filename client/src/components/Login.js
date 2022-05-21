import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from './Login.module.css'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('\u00A0')
    const navigate = useNavigate()


    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/login', {
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
            navigate('/home')
        } 

        if (data.status === 'error') {
            setError(data.error)
        }
    }

    return (
        <div className={style.overlay}>
            <h1 className={style.header}>Login</h1>
            <div className={style.contentContainer}>
                <form onSubmit={loginUser}>
                    <label className={style.text}>Email</label>
                    <input 
                        className={style.input}
                        value={email}
                        onChange={(x) => setEmail(x.target.value)}
                        type='email' 
                    />
                    <br/>    
                    <label className={style.text}>Password</label>
                    <input
                        className={style.input} 
                        value={password}
                        onChange={(x) => setPassword(x.target.value)}
                        type='password' 
                    />
                    <br/>
                    <label className={style.textError}>{error}</label>
                    <br/>
                    <input
                        className={style.button} 
                        type='submit'
                        value='Login'
                    />
                    <label className={style.textFooter}>Don't have an account? 
                        <br/><Link className={style.textLink} to='/register'>Register</Link>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Login;
