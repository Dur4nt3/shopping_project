import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';

import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

// This file only includes tests for interacting with the filter inputs
// The main goal of this test suite (as opposed to "ShopFiltersData.test.jsx")
// is to ensure local filter state is updating as the user interacts with the filters
// This serves as a basis for "ShopFiltersData.test.jsx"
// ensuring the user can alter the filter inputs

// Note this is mainly done for price (ensuring minimum and maximums are held)
// and rating (ensuring that filled stars correlate to the queried rating)
// but I've decided to include category and query for the sake of including all filters

// "ShopFiltersData.test.jsx" is the file which includes testing filtered data
// "ShopFiltersToggle.test.jsx" is the file which includes testing toggling the filters

window.fetch = vi.fn().mockImplementation(() =>
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
let user;

describe('Test Suite for interacting with filters', () => {
    beforeEach(() => {
        router = createMemoryRouter(routes, {
            initialEntries: ['/shop'],
            initialIndex: 0,
        });
        user = userEvent.setup();

        render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );
    });
});
