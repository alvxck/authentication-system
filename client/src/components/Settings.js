import React, {useState}  from 'react'
import { useNavigate } from 'react-router-dom'

function SettingsMenu() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [tempName, setTempName] = useState('')

    async function updateName(event) {
        event.preventDefault()

        const req = await fetch(`http://localhost:1337/api/${id}/update_name`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}` 
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

    async function updatePassword(event) {
        event.preventDefault()

        const req = await fetch(`http://localhost:1337/api/${id}/update_password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                name: tempName
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {

        } else {
            localStorage.removeItem('token')
            alert(data.error)
            navigate('/api/register')
        }
    }

    async function deleteAccount(event) {
        event.preventDefault()

        const req = await fetch(`http://localhost:1337/api/${id}/delete_account`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                name: tempName
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {
            localStorage.removeItem('token')
            alert(data.message)
            navigate('/api/register')
        } else {

        }
    }

    return (
        <div className={style.contentContainer}>

        </div>
    )
};

export default SettingsMenu;