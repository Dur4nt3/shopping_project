import { useState } from 'react';

import FilterManagement from './FilterManagement';

export default function ShopQueryFilter({
    currentQueryFilter,
    applied,
    applyFilter,
    activateFilter,
    deactivateFilter,
}) {
    const [currentQuery, setCurrentQuery] = useState(
        currentQueryFilter !== null ? currentQueryFilter : ''
    );

    return (
        <>
            <input
                value={currentQuery}
                type='text'
                className='query-filter-input'
                placeholder='Search Items'
                onChange={(event) => setCurrentQuery(event.target.value)}
                disabled={!applied}
            />
            <FilterManagement
                filterName='query'
                filterValue={currentQuery}
                applied={applied}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        </>
    );
}
