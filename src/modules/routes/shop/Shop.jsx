import { useState } from 'react';
import { useLoaderData } from 'react-router';

import ShopHeader from './ShopHeader';
import ShopMain from './ShopMain';

import Filters from '../../utilities/filters';

export default function Shop() {
    const { items, status } = useLoaderData();

    const [currentItems, setCurrentItems] = useState(items);
    const [filters, setFilters] = useState(new Filters(null, null, null));

    return (
        <>
            <ShopHeader />
            <ShopMain
                items={currentItems}
                status={status}
                filters={filters}
                setFilters={setFilters}
            />
        </>
    );
}
