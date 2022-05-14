import React, { useEffect, useRef } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useRef(useNavigate()) 


    async function loadDashboard() {
        const req = await fetch('http://localhost:1337/', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = req.json()
        console.log(data)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                loadDashboard()
            }
        }

    }, [])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;