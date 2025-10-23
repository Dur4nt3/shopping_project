import { useState } from 'react';
import { useLoaderData } from 'react-router';

import ShopHeader from './ShopHeader';
import ShopMain from './ShopMain';

import Filters from '../../utilities/filters';

export default function Shop() {
    const { items, status } = useLoaderData();

    const [filters, setFilters] = useState(
        new Filters(
            { data: null, applied: true },
            { data: null, applied: true },
            { data: null, applied: true }
        )
    );

    const currentItems = items;

    function handleFilterAssignment(value, name, toggleActivation) {
        if (toggleActivation) {
            const newFilters = new Filters(
                { ...filters.price },
                { ...filters.category },
                { ...filters.rating }
            );
            newFilters[name].applied = !newFilters[name].applied;

            setFilters(newFilters);
            return;
        }

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
