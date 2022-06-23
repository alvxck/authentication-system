import React, {useState}  from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './Settings.module.css'
import settingsIcon from '../images/settings-icon.png'
import closeIcon from '../images/close-icon.png'


function Settings(props) {
    const id = useParams();
    const navigate = useNavigate()
    const [name, setName] = useState('')

    // PUT HTTP request to update username associated with account
    async function updateName(event) {
        event.preventDefault()

        try {
            const res = await fetch(`http://localhost:1337/api/${id}/update_name`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({
                    name: name
                })
            })
    
            const data = await res.json()
    
            // Update page based on server response 
            if (res.status === 201) {
                navigate(`/api/${data.username}`)
                props.onClose();
                setName('')
            } 
    
            if (res.status === 401) {
                localStorage.removeItem('token')
                alert(data.error)
                navigate('/api/register')
            }
    
            if (res.status === 500) {
                alert('Something went wrong. Please try again.');
                window.location.reload();
            }

        } catch (err) {
            console.log(err)
        }
    }

    // DELETE HTTP request to delete user account
    async function deleteAccount(event) {
        event.preventDefault()

        try {
            const res = await fetch(`http://localhost:1337/api/${id}/delete_account`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })

            const data = await res.json()

            // Update page based on server response 
            if (res.status === 200) {
                localStorage.removeItem('token')
                alert(data.message)
                navigate('/api/register')
            } 
            
            if (res.status === 401) {
                localStorage.removeItem('token')
                alert(data.error)
                navigate('/api/register')
            }

            if (res.status === 500) {
                alert('Something went wrong. Please try again.');
                window.location.reload();
            }

        } catch (err) {
            console.log(err)
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