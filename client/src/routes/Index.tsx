import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header"

export const Index = () => {
    const id = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [settings, setSettings] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:1337/api/${id}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })

            const data = await res.json();

            if (res.status === 200) {
                setName(data.username);
            }

            if (res.status === 401 || res.status === 404) {
                localStorage.removeItem('token')
                alert(data.error)
                navigate('/api/register')
            }
        })();
    }, [id, navigate])

    const toggleSettings = () => {
        setSettings(!settings);
    }

    return (
        <div className='m-0 p-0 flex items-center justify-center w-screen h-screen bg-neutral-900'>
            <Header onClick={toggleSettings}/>

        </div>
    )
}