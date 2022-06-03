import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import style from '../assets/css/Register.module.css'


function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('\u00A0')
    const [isDisplayPassword, setIsDisplayPassword] = useState(false)

    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/api/register', {
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
            navigate('/api/login')
        }

        if (data.status === 'error') {
            setError(data.error)
        }
    }

    function togglePassword() {
        setIsDisplayPassword((isDisplayPassword) => !isDisplayPassword)
    }

    return (
        <div className={style.overlay}>
            <h1 className={style.header}>Registration</h1>
            <div className={style.contentContainer}>
                <form onSubmit={registerUser}>
                    <label className={style.text}>Name</label>
                    <input
                        className={style.input}
                        placeholder='Enter Name'
                        value={name}
                        onChange={(x) => setName(x.target.value)}
                        type='text' 
                    />
                    <br/>
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
                        type='password' 
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
                        value='Register'
                    />
                    <label className={style.textFooter}>Already have an account?
                        <br/><Link className={style.textLink} to='/api/login'>Login</Link>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Register;
