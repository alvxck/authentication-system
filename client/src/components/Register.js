import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Style.css'


function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/register', {
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

        const data = await response.json()

        if (data.status === 'ok') {
            navigate('/login')
        }

        if (data.status === 'error') {
            alert(data.error)
        }
    }

    return (
        <div className='overlay'>
            <h1 className='header'>Registration</h1>
            <div className='content-container'>
                <form onSubmit={registerUser}>
                    <label className='text'>Name</label>
                    <input
                        className='input'
                        value={name}
                        onChange={(x) => setName(x.target.value)}
                        type='text' 
                    />
                    <br/>
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
                        value='Register'
                    />
                    <label className='text-footer'>Already have an account? Click here to login.</label>
                </form>
            </div>
        </div>
    )
}

export default Register;
