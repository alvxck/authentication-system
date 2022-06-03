import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../assets/css/Home.module.css'

function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [tempName, setTempName] = useState('')

    useEffect(() => {        
        (async function verifyUser() {
            console.log('hello')
            const req = await fetch('http://localhost:1337/api/home', {
                headers: {
                    'authorization': localStorage.getItem('token')
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

    }, [navigate])


    async function updateName(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/api/home/update_name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
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
            localStorage.removeItem('token')
            alert(data.error)
            navigate('/api/register')
        }
    }

    function logout() {
        localStorage.removeItem('token')
        navigate('/api/login')
    }
    

    return (
        <div className={style.overlay}>
            <h1 className={style.header}>Hello {name}</h1>
            <div className={style.contentContainer}>
                <input
                    className={style.button}
                    type='button'
                    value='Edit Account'
                    // onClick={}
                />
                <input
                    className={style.button}
                    type='button'
                    value='Logout'
                    onClick={logout}
                />
                <img 
                    className={style.image}
                    src={require('../assets/images/F355_stance.jpg').default} 
                    alt='home wallpaper'/>
            </div>
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
        </div>
    )
}

export default Home;