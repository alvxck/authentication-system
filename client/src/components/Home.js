import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.module.css'

function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('\u00A0')

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            verifyUser()
        } else {
            alert('invalid token')
            localStorage.removeItem('token')
            navigate('/register')
        }
    })

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
    

    return (
        <div className='overlay'>
            <div className='content-container'>
                <h1>Hello {name}</h1>
            </div>
        </div>
    )
}

export default Home;