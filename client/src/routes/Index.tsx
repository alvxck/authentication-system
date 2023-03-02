import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";

export const Index = () => {
    const id = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');

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
                navigate('/')
            }
        })();
    }, [id, navigate])

    return (
        <div className='m-0 p-0 flex flex-col items-center justify-start w-screen h-screen bg-neutral-900'>
            <Header/>
            <div className='m-24 flex flex-row items-start justify-center gap-24 w-full'>
                <Profile name={name}/>
                <div className='text-white p-8 w-2/4 h-96 bg-neutral-800 border rounded border-neutral-700'>
                    <h1 className='text-5xl mb-5'>Lorem Ipsum</h1>
                    <p>Non eu ad quis laborum irure proident deserunt nulla eiusmod nostrud commodo Lorem. Deserunt sunt elit commodo ullamco. Irure et ea eu ad proident esse elit culpa commodo non. Ad non occaecat officia anim et aliquip consectetur officia fugiat do dolore anim proident tempor. Dolor occaecat fugiat ad in non duis. Laborum proident velit minim non veniam velit quis nisi nisi sit. Officia excepteur eiusmod consectetur sint ipsum ea veniam magna.</p>
                    <p>Non eu ad quis laborum irure proident deserunt nulla eiusmod nostrud commodo Lorem. Deserunt sunt elit commodo ullamco.</p>
                </div>
            </div>

        </div>
    )
}