import { useState } from 'react';
import { useLoaderData } from 'react-router';
import useFetchItems from '../../utilities/useFetchItems';
import useSyncFilterData from '../../utilities/useSyncFilterData';

import ShopHeader from './ShopHeader';
import ShopMain from './ShopMain';

import Filters from '../../utilities/filters';

export default function Shop() {
    const { items, error, loading } = useFetchItems();
    const { queriedFilters } = useLoaderData();

    const [filters, setFilters] = useState(
        new Filters(
            { data: null, applied: true },
            { data: null, applied: true },
            { data: null, applied: true }
        )
    );

    useSyncFilterData(filters, queriedFilters, setFilters);

    const currentItems = items;

    function toggleFilter(name) {
        const newFilters = new Filters(
            { ...filters.price },
            { ...filters.category },
            { ...filters.rating }
        );
        console.log('toggling', name, 'activation');
        newFilters[name].applied = !newFilters[name].applied;

        setFilters(newFilters);
        return;
    }

    return (
        <>
            <ShopHeader />
            <ShopMain
                items={currentItems}
                loading={loading}
                error={error}
                filters={filters}
                toggleFilter={toggleFilter}
            />
        </>
    );
}
