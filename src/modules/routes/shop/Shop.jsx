import { useState } from 'react';
import { useLoaderData } from 'react-router';
import useFetchItems from '../../utilities/useFetchItems';
import useSyncFilterData from '../../utilities/useSyncFilterData';

import extractCategories from '../../utilities/extractCategories';
import extractPriceRange from '../../utilities/extractPriceRange';

import createFilteredItems from '../../utilities/createFilteredItems';

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
            { data: null, applied: true },
            { data: null, applied: true }
        )
    );

    useSyncFilterData(filters, queriedFilters, setFilters);

    const categories = extractCategories(items);
    const priceRange = extractPriceRange(items);
    const currentItems =
        items === null ? items : createFilteredItems(items, filters);

    function toggleFilter(name) {
        const newFilters = new Filters(
            { ...filters.price },
            { ...filters.category },
            { ...filters.rating },
            { ...filters.query }
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
                categories={categories}
                priceRange={priceRange}
            />
        </>
    );
}
