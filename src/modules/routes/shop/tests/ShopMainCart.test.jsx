import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';

import Shop from '../../shop/Shop';
import Checkout from '../../checkout/Checkout';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

// NOTE: More consistency was found when using "waitFor" as opposed to using "find"
// Therefore, although "find" may seem more suitable, I chose to go with "waitFor"

// NOTE 2: Cart related tests are found in: ShopMainCart.test.jsx

window.fetch = vi
    .fn()
    .mockImplementationOnce(() =>
        Promise.resolve({
            status: 404,
        })
    )
    .mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(items),
        })
    );

const routes = [
    {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
    },
];

let router;

describe('Test Suite for item fetching and displaying', () => {
    beforeEach(() => {
        router = createMemoryRouter(routes, {
            initialEntries: ['/shop'],
            initialIndex: 0,
        });

        render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );
    });

    it('placeholder', async () => {});
});
