import React, {useState}  from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './Settings.module.css'
import settingsIcon from '../images/settings-icon.png'
import closeIcon from '../images/close-icon.png'



function Settings(props) {
    const id = useParams();
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')


    async function updateName(event) {
        event.preventDefault()

        const req = await fetch(`http://localhost:1337/api/${id}/update_name`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                name: name
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {
            window.location.reload()
            setName('')
        } else {
            localStorage.removeItem('token')
            setStatus(data.error)
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
            }
        })

        const data = await req.json()

        if (data.status === 'ok') {
            localStorage.removeItem('token')
            alert(data.message)
            navigate('/api/register')
        } else {
            localStorage.removeItem('token')
            alert(data.error)
            navigate('/api/register')
        }
    }

    return (
        <div className={style.contentContainer}>
            <div className={style.settingsMenu}>
                <img
                    className={style.close}
                    onClick={props.onClose}
                    src={closeIcon}
                    alt='close'
                />
                <div className={style.headerContainer}>
                    <img 
                    className={style.headerIcon}
                    src={settingsIcon}
                    alt='home'
                    />  
                    <h1 className={style.header}>Settings</h1>
                </div>

                <label className={style.text}>Change Name</label>
                <input
                    className={style.input} 
                    onChange={(x) => setName(x.target.value)}
                    type='text'
                    value={name}
                    placeholder='Enter New Name'
                />            

                <label className={style.textError}>{status}</label>

                <div className={style.submitContainer}>
                    <input
                        className={style.deleteButton} 
                        onClick={deleteAccount}
                        type='submit'
                        value='Delete Account'
                    />
                    <input
                        className={style.saveButton} 
                        onClick={updateName}
                        type='submit'
                        value='Save Changes'
                    />
                </div>
            </div>
        </div>
    )
};

export default Settings;