import { useState, useEffect } from 'react';

export default function useFetchItems() {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error');
                }
                return response.json();
            })
            .then((jsonData) => setItems(jsonData))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return { items, error, loading };
}
