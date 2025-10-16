import { createBrowserRouter } from 'react-router';

import Root from './modules/routes/root/Root';
import Shop from './modules/routes/shop/Shop';
import Item from './modules/routes/item/Item';
import Checkout from './modules/routes/checkout/Checkout';

import RootError from './modules/routes/root/RootError';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <RootError />,
    },
    {
        path: 'shop',
        element: <Shop />,
    },
    {
        path: 'item/:itemId',
        element: <Item />,
    },
    {
        path: 'checkout',
        element: <Checkout />,
    },
]);

export default router;
