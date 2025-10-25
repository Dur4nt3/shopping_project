import { useState } from 'react';
import useFetchItems from '../../utilities/useFetchItems';

import ShopHeader from './ShopHeader';
import ShopMain from './ShopMain';

import Filters from '../../utilities/filters';

export default function Shop() {
    const { items, error, loading } = useFetchItems();

    const [filters, setFilters] = useState(
        new Filters(
            { data: null, applied: true },
            { data: null, applied: true },
            { data: null, applied: true }
        )
    );

    const currentItems = items;

    function toggleFilter(name) {
            const newFilters = new Filters(
                { ...filters.price },
                { ...filters.category },
                { ...filters.rating }
            );
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
