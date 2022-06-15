import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css';
import Navbar from '../components/Navbar';
import Settings from '../components/Settings';
import f355 from '../images/f355-header.jpg'

function Home() {
    const id = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isOpen, setIsOpen] = useState(false)

    // Check for user specific JWT on page load. Redirect if JWT is invalid.
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

    function toggleSettings() {
        setIsOpen((prevOpen) => !prevOpen)
    };

    return (
        <div className='overlay'>
            <Navbar 
                username={name}
                onClick={toggleSettings}
            />

            {isOpen && <Settings onClose={toggleSettings}/>}

            <div className='content--container'>
                <h3 className='header'>Lorem ipsum dolor sit amet</h3>
                <img 
                    className='header--image'
                    src={f355} 
                    alt='header'
                />
                <p className='article--text'>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>

    )
}

export default Home;