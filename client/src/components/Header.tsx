import { useNavigate } from "react-router-dom";

export const Header = (props : any) => {
    const navigate = useNavigate(); 

    const logout = () => {
        alert('Logout was succesful.');
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className='p-4 flex flex-row items-center gap-4 w-screen border-neutral-700 bg-neutral-800'>
            <svg className='ml-4 w-7 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            <input 
                className='px-1 py-0.5 w-64 text-white border rounded border-neutral-700 bg-neutral-900 focus:border-blue-500 focus:outline-none'
                placeholder='Search'
                type='text'
            />
            <input
                className='text-white ml-auto cursor-pointer hover:text-blue-500' 
                onClick={() => console.log('/settings')}
                type='submit'
                value='Settings'
            />
            <input
                className='text-white mr-4 cursor-pointer hover:text-blue-500' 
                onClick={logout}
                type='submit'
                value='Logout'
            />
        </div>
    )
}