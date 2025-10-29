import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';

import HomeHeader from '../HomeHeader';
import Shop from '../../shop/Shop';
import Checkout from '../../checkout/Checkout';

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
    {
        path: 'checkout',
        element: <Checkout />,
    },
];

describe('Test Suite For The Homepage Header', () => {
    it('Renders the header (snapshot test)', async () => {
        const router = createMemoryRouter(routes);

        const container = render(<RouterProvider router={router} />);

        expect(container).toMatchSnapshot();
    });

    it('Navigates to the shop using the header button', async () => {
        expect.assertions(3);

        const router = createMemoryRouter(routes);
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        const shopLink = screen.getByRole('link', {
            name: /shop now/i,
        });

        await user.click(shopLink);

        expect(router.state.location.pathname).toBe('/shop');
        expect(
            screen.getByRole('heading', { name: 'Shop' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Fresh finds, just for you.' })
        ).toBeInTheDocument();
    });
});
