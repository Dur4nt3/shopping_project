import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';

import ThemeProvider from '../../../utilities/Theme';

import HomeHeader from '../HomeHeader';
import Shop from '../../shop/Shop';
import Checkout from '../../checkout/Checkout';

const routes = [
    {
        path: '/',
        element: <HomeHeader />,
    },
    {
        path: 'shop',
        element: <Shop />,
    },
    {
        path: 'checkout',
        element: <Checkout />,
    },
];

describe('Test Suite For The Navbar', () => {
    it('Is able to change themes', async () => {
        expect.assertions(4);

        const router = createMemoryRouter(routes);
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );

        const darkModeButton = screen.getByRole('button', {
            name: /change to dark mode/i,
        });

        // To dark mode
        await user.click(darkModeButton);

        expect(
            screen.getByRole('button', { name: /change to light mode/i })
        ).toBeInTheDocument();
        expect(document.body.classList.contains('dark-mode')).toBeTruthy();

        const lightModeButton = screen.getByRole('button', {
            name: /change to light mode/i,
        });

        // To light mode
        await user.click(lightModeButton);

        expect(
            screen.getByRole('button', { name: /change to dark mode/i })
        ).toBeInTheDocument();
        expect(document.body.classList.contains('dark-mode')).toBeFalsy();
    });

    it('Opens and closes the menu', async () => {
        expect.assertions(4);

        const router = createMemoryRouter(routes);
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );

        const menuButton = screen.getByRole('button', {
            name: /open navigation menu/i,
        });

        await user.click(menuButton);

        // In smaller layouts (where the menu is visible) there an additional, hidden, shop and checkout links
        // With the menu open, there should be 2 of each
        expect(screen.getAllByRole('link', { name: 'Shop' }).length).toBe(2);
        expect(screen.getAllByRole('link', { name: 'Checkout' }).length).toBe(
            2
        );

        const closeButton = screen.getByRole('button', {
            name: /close navigation menu/i,
        });

        await user.click(closeButton);

        expect(screen.getAllByRole('link', { name: 'Shop' }).length).toBe(1);
        expect(screen.getAllByRole('link', { name: 'Checkout' }).length).toBe(
            1
        );
    });

    it('Can navigate to the shop from the menu', async () => {
        expect.assertions(3);

        const router = createMemoryRouter(routes);
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );

        const menuButton = screen.getByRole('button', {
            name: /open navigation menu/i,
        });

        await user.click(menuButton);

        // Ensure we are picking the correct link
        // We already know it appears when the menu is open
        // So now we can use the test-id to target it specifically
        const shopLink = screen.getByTestId('menu-shop-link');

        await user.click(shopLink);

        expect(router.state.location.pathname).toBe('/shop');
        expect(
            screen.getByRole('heading', { name: 'Shop' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Fresh finds, just for you.' })
        ).toBeInTheDocument();
    });

    it('Can navigate to the checkout from the menu', async () => {
        expect.assertions(3);

        const router = createMemoryRouter(routes);
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );

        const menuButton = screen.getByRole('button', {
            name: /open navigation menu/i,
        });

        await user.click(menuButton);

        // Same strategy as with the shop test case above
        const shopLink = screen.getByTestId('menu-checkout-link');

        await user.click(shopLink);

        expect(router.state.location.pathname).toBe('/checkout');
        expect(
            screen.getByRole('heading', { name: 'Checkout' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Almost yours, just one step away.' })
        ).toBeInTheDocument();
    });
});

// TODO
// Write a test for checking whether or not you can view the cart when clicking the cart icon
// Ensure you can navigate from a non-root location (shop, item, etc.) back to root ('/') by clicking the site name on the navbar
