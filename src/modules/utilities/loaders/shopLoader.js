function modifyDecodedURIComponent(decodedValue) {
    return decodedValue === 'null' ? null : decodedValue;
}

export default async function shopLoader({ request }) {
    console.log('executing shop loader', request);
    const url = new URL(request.url);
    const filterData = {
        price: modifyDecodedURIComponent(
            decodeURIComponent(url.searchParams.get('price'))
        ),
        category: modifyDecodedURIComponent(
            decodeURIComponent(url.searchParams.get('category'))
        ),
        rating: modifyDecodedURIComponent(
            decodeURIComponent(url.searchParams.get('rating'))
        ),
    };

    return { queriedFilters: filterData };
}
