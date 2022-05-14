import { useState } from 'react'

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
  <div>
    <h1>Login</h1>
    <form onSubmit={loginUser}>
      <input 
        value={email}
        onChange={(x) => setEmail(x.target.value)}
        type='email' 
        placeholder='Email'
      />
      <input 
        value={password}
        onChange={(x) => setPassword(x.target.value)}
        type='password' 
        placeholder='Password'
      />
      <input 
        type='submit'
        value='Login'
      />
    </form>
  </div>
  )
}

export default Login;
