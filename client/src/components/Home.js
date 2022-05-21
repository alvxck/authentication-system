import React, { useEffect, useRef, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
    const navigate = useRef(useNavigate()) 
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    async function loadDashboard() {
        const req = await fetch('http://localhost:1337/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()

        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
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

    async function updateQuote(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: tempQuote
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {
            setQuote(tempQuote)
            setTempQuote('')
        } else {
            alert(data.error)
        }
    }

    return (
        <div className='overlay'>
            <div className='content-container'>
                <h1>Home</h1>
                <p>Your Quote: {quote || 'No quote found'}</p>
                <form onSubmit={updateQuote}>
                    <input 
                        type='text' 
                        placeholder='Quote'
                        value={tempQuote}
                        onChange={x => setTempQuote(x.target.value)}
                    />
                    <br/>
                    <input 
                        type='submit'
                        value='Update Quote'
                    />
                </form>
            </div>
        </div>
    )
}

export default Home;