function modifyDecodedURIComponent(decodedValue) {
    return decodedValue === 'null' ? null : decodedValue;
}

function handlePriceFilterData(searchParams) {
    if (
        decodeURIComponent(searchParams.get('from')) === 'null' ||
        decodeURIComponent(searchParams.get('to')) === 'null'
    ) {
        return null;
    }

    return [
        Number(decodeURIComponent(searchParams.get('from'))),
        Number(decodeURIComponent(searchParams.get('to'))),
    ];
}

export default async function shopLoader({ request }) {
    console.log('executing shop loader', request);
    const url = new URL(request.url);
    const filterData = {
        price: handlePriceFilterData(url.searchParams),
        category: modifyDecodedURIComponent(
            decodeURIComponent(url.searchParams.get('category'))
        ),
        rating: modifyDecodedURIComponent(
            decodeURIComponent(url.searchParams.get('rating'))
        ),
        query: modifyDecodedURIComponent(
            decodeURIComponent(url.searchParams.get('query'))
        ),
    };

    return { queriedFilters: filterData };
}
