import { useRouteError } from 'react-router-dom';


export const Error = () => {
    const error : any = useRouteError();
    console.error(error);

    return (
        <div className='main'>
            <i>{error.statusText || error.message}</i>
        </div>
    )
}