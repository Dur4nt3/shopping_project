import { useRouteError } from 'react-router';

export default function RootError() {
    const error = useRouteError();
    
    return (
        <>
            <h1>Temp Error Page</h1>
            <h3>Error: {error.message ? error.message : error.statusText}</h3>
        </>
    );
}
