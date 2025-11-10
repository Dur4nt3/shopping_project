import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

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

let router;
let user;
let container;

describe('Test Suite For The Navbar', () => {
    beforeEach(() => {
        router = createMemoryRouter(routes);
        user = userEvent.setup();

        container = render(
            <CartProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </CartProvider>
        );
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Renders the navbar (snapshot test)', () => {
        expect(container).toMatchSnapshot();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Is able to change themes', async () => {
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

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Opens and closes the menu', async () => {
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

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can navigate to the shop from the menu', async () => {
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
        await waitFor(() => {
            expect(
                document.querySelector('.shop-link.currently-visited')
            ).not.toBeNull();
        });
        expect(
            screen.getByRole('heading', { name: 'Shop' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Fresh finds, just for you.' })
        ).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can navigate to the shop from navbar', async () => {
        const shopLink = within(screen.getByTestId('nav-links')).getByRole(
            'link',
            { name: /shop/i }
        );

        await user.click(shopLink);

        expect(router.state.location.pathname).toBe('/shop');
        await waitFor(() => {
            expect(
                within(screen.getByTestId('nav-links')).getByRole('link', {
                    name: /shop/i,
                })
            ).toHaveClass('currently-visited');
        });
        expect(
            screen.getByRole('heading', { name: 'Shop' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Fresh finds, just for you.' })
        ).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can navigate to the checkout from the menu', async () => {
        const menuButton = screen.getByRole('button', {
            name: /open navigation menu/i,
        });

        await user.click(menuButton);

        // Same strategy as with the shop test case above
        const checkoutLink = screen.getByTestId('menu-checkout-link');

        await user.click(checkoutLink);

        expect(router.state.location.pathname).toBe('/checkout');
        expect(
            document.querySelector('.checkout-link.currently-visited')
        ).not.toBeNull();
        expect(
            screen.getByRole('heading', { name: 'Checkout' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: 'Almost yours, just one step away.',
            })
        ).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can navigate to the checkout from navbar', async () => {
        const shopLink = within(screen.getByTestId('nav-links')).getByRole(
            'link',
            { name: /checkout/i }
        );

        await user.click(shopLink);

        expect(router.state.location.pathname).toBe('/checkout');
        expect(
            within(screen.getByTestId('nav-links')).getByRole('link', {
                name: /checkout/i,
            })
        ).toHaveClass('currently-visited');
        expect(
            screen.getByRole('heading', { name: 'Checkout' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: 'Almost yours, just one step away.',
            })
        ).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can navigate in between all routes', async () => {
        // DO NOT define any variables as you need to re-fetch the links every time you navigate

        await user.click(
            screen.getByRole('button', {
                name: /open navigation menu/i,
            })
        );

        await user.click(screen.getByTestId('menu-shop-link'));

        expect(router.state.location.pathname).toBe('/shop');

        await user.click(
            screen.getByRole('button', {
                name: /open navigation menu/i,
            })
        );
        await user.click(screen.getByTestId('menu-checkout-link'));

        expect(router.state.location.pathname).toBe('/checkout');

        await user.click(
            screen.getByRole('button', {
                name: /open navigation menu/i,
            })
        );
        await user.click(screen.getByTestId('menu-shop-link'));

        expect(router.state.location.pathname).toBe('/shop');

        await user.click(screen.getByRole('link', { name: /pseudo shopper/i }));

        await waitFor(() => {
            expect(router.state.location.pathname).toBe('/');
        });

        await user.click(
            screen.getByRole('button', {
                name: /open navigation menu/i,
            })
        );
        await user.click(screen.getByTestId('menu-checkout-link'));

        expect(router.state.location.pathname).toBe('/checkout');

        await user.click(screen.getByRole('link', { name: /pseudo shopper/i }));

        expect(router.state.location.pathname).toBe('/');
    });
});
