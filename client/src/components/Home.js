import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.module.css'

function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [tempName, setTempName] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        async function verifyUser() {
            const req = await fetch('http://localhost:1337/home', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
    
            const data = await req.json()
            console.log(data)
    
            if (data.status === 'ok') {
                setName(data.name)
            } else {
                alert(data.error)
                navigate('/register')
            }
        }

        if(token) {
            verifyUser()
        } else {
            localStorage.removeItem('token')
            alert('invalid token')
            navigate('/register')
        }

    }, [navigate])


    async function updateName(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/update_name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: tempName
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {
            setName(tempName)
            setTempName('')
        } else {
            alert(data.error)
            navigate('/register')
        }
    }

    function logout() {
        localStorage.removeItem('token')
        navigate('/login')
    }
    

    return (
        <div className='overlay'>
            <div className='content-container'>
                <h1>Hello {name}</h1>
                <form onSubmit={updateName}>
                    <input 
                        type='text' 
                        placeholder='New Name'
                        value={tempName}
                        onChange={x => setTempName(x.target.value)}
                    />
                    <br/>
                    <input 
                        type='submit'
                        value='Save'
                    />
                </form>
                <input
                    type='button'
                    value='Logout'
                    onClick={logout}
                />
            </div>
        </div>
    )
}

export default Home;