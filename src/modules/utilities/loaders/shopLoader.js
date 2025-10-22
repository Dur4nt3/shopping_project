export default async function shopLoader() {
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.status !== 200) {
        // Don't not throw an error
        // The application isn't configured to handle errors from here
        return { items: null, status: response.status };
    }
    const items = await response.json();

    return { items, status: 200 };
}
