import { useState } from 'react';
import { useLoaderData } from 'react-router';

import ShopHeader from './ShopHeader';
import ShopMain from './ShopMain';

import Filters from '../../utilities/filters';

export default function Shop() {
    const { items, status } = useLoaderData();

    const [currentItems, setCurrentItems] = useState(items);
    const [filters, setFilters] = useState(
        new Filters(
            { data: null, applied: true },
            { data: null, applied: true },
            { data: null, applied: true }
        )
    );

    function handleFilterAssignment(value, name) {
        const newFilters = new Filters(
            { ...filters.price },
            { ...filters.category },
            { ...filters.rating }
        );
        
        newFilters[name].data = value;

        setFilters(newFilters);
    }

    return (
        <>
            <ShopHeader />
            <ShopMain
                items={currentItems}
                status={status}
                filters={filters}
                handleFilterAssignment={handleFilterAssignment}
            />
        </>
    );
}
