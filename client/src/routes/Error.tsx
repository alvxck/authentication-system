import { useRouteError, Link } from 'react-router-dom';


export const Error = () => {
    const error : any = useRouteError();
    console.error(error);

    return (
        <div className='m-0 p-0 flex flex-col items-center justify-center w-screen h-screen bg-neutral-900'>
            <h1 className='text-white text-center text-4xl'>Error</h1>
            <i className='text-white'>{error.statusText || error.message}</i>
            <div className='mt-6 flex gap-8'>
                <Link className='text-blue-500' to='/'> Login↗</Link>
                <Link className='text-blue-500' to='/register'> Register↗</Link>
            </div>
        </div>
    )
}