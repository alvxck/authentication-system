import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'


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
        <div className='overlay'>
            <h1 className='header'>Login</h1>
            <div className='content-container'>
                <form onSubmit={loginUser}>
                    <label className='text'>Email</label>
                    <input 
                        className='input'
                        value={email}
                        onChange={(x) => setEmail(x.target.value)}
                        type='email' 
                    />
                    <br/>    
                    <label className='text'>Password</label>
                    <input
                        className='input' 
                        value={password}
                        onChange={(x) => setPassword(x.target.value)}
                        type='password' 
                    />
                    <br/>
                    <label className='text-error'>{error}</label>
                    <br/>
                    <input
                        className='button' 
                        type='submit'
                        value='Login'
                    />
                    <label className='text-footer'>Don't have an account? 
                        <br/><Link className='text-link' to='/register'>Register</Link>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Login;
