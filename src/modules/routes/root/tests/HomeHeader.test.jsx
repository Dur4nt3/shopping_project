import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';

import ThemeProvider from '../../../utilities/Theme';

import HomeHeader from '../HomeHeader';
import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';
import { items } from '../../shop/tests/utilities/mockedItems';

window.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(items),
    })
);

const routes = [
    {
        path: '/',
        element: <HomeHeader />,
    },
    {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
    },
];

let router;
let user;
let container;

describe('Test Suite For The Homepage Header', () => {
    beforeEach(() => {
        router = createMemoryRouter(routes);
        user = userEvent.setup();

        container = render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );
    });

    it('Renders the header (snapshot test)', () => {
        expect(container).toMatchSnapshot();
    });

    it('Navigates to the shop using the header button', async () => {
        const shopLink = screen.getByRole('link', {
            name: /shop now/i,
        });

        await user.click(shopLink);

        await waitFor(() => {
            expect(router.state.location.pathname).toBe('/shop');
        });
        expect(
            screen.getByRole('heading', { name: 'Shop' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Fresh finds, just for you.' })
        ).toBeInTheDocument();
    });
});
