import { useState } from 'react'

function App() {
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
    console.log(data)
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
        value='Register'
      />
    </form>
  </div>
  )
}

export default App;
