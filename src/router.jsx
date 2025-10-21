import { createBrowserRouter } from 'react-router';

import Root from './modules/routes/root/Root';
import Shop from './modules/routes/shop/Shop';
import Checkout from './modules/routes/checkout/Checkout';

import RootError from './modules/routes/root/RootError';

import shopLoader from './modules/utilities/loaders/shopLoader';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <RootError />,
    },
    {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
    },
    {
        path: 'checkout',
        element: <Checkout />,
    },
]);

export default router;
