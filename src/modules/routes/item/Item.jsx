import { useParams } from 'react-router';

export default function Item() {
    const { itemId } = useParams();

    return (
        <>
            <h1>This is the page for the items</h1>
            <h3>Viewing Item {itemId}</h3>
        </>
    );
}
