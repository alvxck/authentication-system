import { useRouteError } from 'react-router-dom';


export const Error = () => {
    const error : any = useRouteError();
    console.error(error);

    return (
        <>
        <i>{error.statusText || error.message}</i>
        </>
    )
}