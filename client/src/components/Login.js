import { useState } from 'react'
import './Style.css'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

        if(data.user) {
            localStorage.setItem('token', data.user)
            alert('Login Successful')
            window.location.href = '/home'
        } else {
            alert('Incorrect username or password')
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
                    <input
                        className='button' 
                        type='submit'
                        value='Login'
                    />
                    <label className='text-footer'>Dont have an account? Click here to register.</label>
                </form>
            </div>
        </div>
    )
}

export default Login;
