import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './Home.module.css'
import Navbar from '../components/Navbar';
import f355 from '../images/f355-header.jpg'

function Home() {
    const id = useParams();
    const navigate = useNavigate()
    const [name, setName] = useState('')

    useEffect(() => {        
        (async function verifyUser() {
            const req = await fetch(`http://localhost:1337/api/${id}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
    
            const data = await req.json()
    
            if (data.status === 'ok') {
                setName(data.name)
            } else {
                localStorage.removeItem('token')
                alert(data.error)
                navigate('/api/register')
            }
        })();

    }, [id, navigate])

    return (
        <div className={style.overlay}>
            <Navbar 
                username={name}
            />
            <div className={style.contentContainer}>
                <h3 className={style.header}>Lorem ipsum dolor sit amet</h3>
                <img 
                    className={style.headerImage}
                    src={f355} 
                    alt='header'
                />
                <p className={style.articleText}>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>

    )
}

export default Home;