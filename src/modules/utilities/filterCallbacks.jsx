export function applyFilter(name, value, setSearchParams) {
    if (value !== null && value !== '') {
        if (name === 'price') {
            setSearchParams((searchParams) => {
                searchParams.set('from', encodeURIComponent(value[0]));
                searchParams.set('to', encodeURIComponent(value[1]));
                return searchParams;
            });
        } else {
            setSearchParams((searchParams) => {
                searchParams.set(name, encodeURIComponent(value));
                return searchParams;
            });
        }
    }
}

export function activateFilter(name, value, setSearchParams, toggleFilter) {
    if (value !== null && value !== '') {
        if (name === 'price') {
            setSearchParams((searchParams) => {
                searchParams.set('from', encodeURIComponent(value[0]));
                searchParams.set('to', encodeURIComponent(value[1]));
                return searchParams;
            });
        } else {
            setSearchParams((searchParams) => {
                searchParams.set(name, encodeURIComponent(value));
                return searchParams;
            });
        }
    }
    toggleFilter(name);
}

export function deactivateFilter(name, setSearchParams, toggleFilter) {
    if (name === 'price') {
        setSearchParams((searchParams) => {
            searchParams.delete('from');
            searchParams.delete('to');
            return searchParams;
        });
    } else {
        setSearchParams((searchParams) => {
            searchParams.delete(name);
            return searchParams;
        });
    }
    toggleFilter(name);
}
