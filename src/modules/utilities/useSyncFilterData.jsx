import { useEffect } from 'react';
import Filters from './filters';

export default function useSyncFilterData(filters, queriedFilters, setFilters) {
    // Sync the "filters" state with the URL search parameters
    // DO NOT change the state's property values when the search parameters are null
    // This allows us to preserve local state, which in-turn doesn't reset filter data within the same session
    useEffect(() => {
        let changedData = false;

        // Copy of current state
        const newFilters = new Filters(
            { ...filters.price },
            { ...filters.category },
            { ...filters.rating },
            { ...filters.query }
        );

        // Only applying data and activating filters when queried data IS NOT null
        if (queriedFilters.price !== null) {
            if (queriedFilters.price !== filters.price.data) {
                newFilters.price = {
                    data: queriedFilters.price,
                    applied: true,
                };
                changedData = true;
            }
        }
        if (queriedFilters.category !== null) {
            if (queriedFilters.category !== filters.category.data) {
                newFilters.category = {
                    data: queriedFilters.category,
                    applied: true,
                };
                changedData = true;
            }
        }
        if (queriedFilters.rating !== null) {
            if (queriedFilters.rating !== filters.rating.data) {
                newFilters.rating = {
                    data: Number(queriedFilters.rating),
                    applied: true,
                };
                changedData = true;
            }
        }
        if (queriedFilters.query !== null) {
            if (queriedFilters.query !== filters.query.data) {
                newFilters.query = {
                    data: queriedFilters.query,
                    applied: true,
                };
                changedData = true;
            }
        }

        // Only set the state when data has changed
        if (changedData) {
            setFilters(newFilters);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queriedFilters]);
}
