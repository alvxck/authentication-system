import React, {useState}  from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './Settings.module.css'
import settingsIcon from '../images/settings-icon.png'


function Settings(props) {
    const id = useParams();
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


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
            alert(data.message)
            setName('')
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
                password: password
            })
        })

        const data = await req.json()

        if (data.status === 'ok') {
            alert(data.message)
            setPassword('')
        } else {
            localStorage.removeItem('token')
            setError(data.error)
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
            setError(data.error)
            navigate('/api/register')
        }
    }

    return (
        <div className={style.contentContainer}>
            <div className={style.settingsMenu}>
                <input
                    className={style.buttonClose} 
                    onClick={props.onClose}
                    type='submit'
                    value='close'
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
                <div className={style.formInput}>
                    <input
                        className={style.input} 
                        onChange={(x) => setName(x.target.value)}
                        type='text'
                        value={name}
                        placeholder='Enter New Name'
                    />
                    <button 
                        onClick={updateName}
                        className={style.saveButton}
                    >   
                    Save</button>                
                </div>

                <label className={style.text}>Change Password</label>
                <div className={style.formInput}>
                    <input
                        className={style.input} 
                        onChange={(x) => setPassword(x.target.value)}
                        type='text'
                        value={password}
                        placeholder='Enter New Password'
                    />
                    <button 
                        onClick={updatePassword}
                        className={style.saveButton}
                    >   
                    Save</button>
                </div>

                <input
                    className={style.button} 
                    onClick={deleteAccount}
                    type='submit'
                    value='Delete Account'
                />
                <label className={style.textError}>{error}</label>
            </div>
        </div>
    )
};

export default Settings;