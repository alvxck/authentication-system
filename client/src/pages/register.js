import './App.css';
import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
  }

  return (
  <div>
    <h1>Registration</h1>
    <form onSubmit={registerUser}>
      <input
        value={name}
        onChange={(x) => setName(x.target.value)}
        type='text' 
        placeholder='Name'
      />
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
        value='Register'
      />
    </form>
  </div>
  )
}

export default App;
