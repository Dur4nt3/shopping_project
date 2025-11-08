import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from '../../shop/tests/utilities/mockedItems';

window.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(items),
    })
);

let parsedStorage = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
    { id: 4, quantity: 3 },
    { id: 5, quantity: 1 },
];
let stringifiedStorage = JSON.stringify(parsedStorage);

// Simple mock for the localStorage
window.localStorage = {
    getItem: vi
        .fn()
        .mockImplementationOnce(() => null)
        .mockImplementation(() => stringifiedStorage),
    setItem(newCart) {
        parsedStorage = JSON.parse(newCart);
        stringifiedStorage = newCart;
    },
    // Not being used, mocked for safety
    removeItem() {
        return null;
    },
};

const routes = [
    {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
    },
];

let router;
let user;

let cartButton;
let cartModal;

describe('Test Suite for displaying the cart', () => {
    beforeEach(async () => {
        router = createMemoryRouter(routes, {
            initialEntries: ['/shop'],
            initialIndex: 0,
        });
        user = userEvent.setup();

        render(
            <CartProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </CartProvider>
        );

        // The cart and the shop load at approx. the same time
        await waitFor(() => {
            expect(
                Array.from(screen.getByTestId('shop-items-grid').children)
            ).toHaveLength(10);
        });

        cartButton = screen.getByRole('button', { name: /view cart/i });
        await user.click(cartButton);

        cartModal = screen.getByTestId('cart-modal');

        expect(cartModal).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can display a no item notice when the cart is empty', async () => {
        // Close button appear when cart is empty
        expect(within(cartModal).getByRole('button', { name: /close cart/i }));

        expect(
            within(cartModal).getByRole('heading', {
                name: 'No Items In Cart...',
            })
        );
        expect(
            within(cartModal).getByRole('heading', {
                name: 'Add items to your cart before checking-out.',
            })
        );

        // Exiting the cart
        await user.click(
            within(cartModal).getByRole('button', { name: /close cart/i })
        );

        await waitFor(() => {
            expect(screen.queryByTestId('cart-modal')).not.toBeInTheDocument();
        });

        await user.click(cartButton);

        cartModal = screen.getByTestId('cart-modal');

        // The same data is still displaying
        expect(
            within(cartModal).getByRole('heading', {
                name: 'No Items In Cart...',
            })
        );
        expect(
            within(cartModal).getByRole('heading', {
                name: 'Add items to your cart before checking-out.',
            })
        );
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can load items from the localStorage to the cart', async () => {
        // Close button appear when cart has items
        expect(within(cartModal).getByRole('button', { name: /close cart/i }));

        expect(
            within(cartModal).getByRole('heading', { name: /your cart/i })
        ).toBeInTheDocument();

        let addedItemsCont = within(cartModal).getByTestId('added-items-cont');
        expect(addedItemsCont).toBeInTheDocument();

        expect([...addedItemsCont.children]).toHaveLength(4);

        await user.click(
            within(cartModal).getByRole('button', { name: /close cart/i })
        );

        // Ensure the animation is finished and the modal is removed
        await waitFor(() => {
            expect(screen.queryByTestId('cart-modal')).not.toBeInTheDocument();
        });

        await user.click(cartButton);

        cartModal = screen.getByTestId('cart-modal');

        addedItemsCont = within(cartModal).getByTestId('added-items-cont');
        expect(addedItemsCont).toBeInTheDocument();

        expect([...addedItemsCont.children]).toHaveLength(4);
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly display loaded items', async () => {
        const addedItemsCont =
            within(cartModal).getByTestId('added-items-cont');

        const items = [...addedItemsCont.children];

        // Checking that the expected items are displaying
        expect(
            within(items[0]).getByRole('heading', { name: /item 1/i })
        ).toBeInTheDocument();
        expect(
            within(items[1]).getByRole('heading', { name: /item 2/i })
        ).toBeInTheDocument();
        expect(
            within(items[2]).getByRole('heading', { name: /item 4/i })
        ).toBeInTheDocument();
        expect(
            within(items[3]).getByRole('heading', { name: /item 5/i })
        ).toBeInTheDocument();

        // Given the above tests and how the components are built
        // If 1 item displays properly, all of them are
        const [item1] = items;

        // Item graphic is shown
        expect(within(item1).getByAltText(/item 1/i)).toBeInTheDocument();

        expect(within(item1).getByText(/category 1/i)).toBeInTheDocument();
        expect(within(item1).getByText(/item 1/i)).toBeInTheDocument();

        expect(within(item1).getByText('$20')).toBeInTheDocument();
        expect(within(item1).getByText('$10 each')).toBeInTheDocument();

        // Item count increment and decrement buttons
        expect(
            within(item1).getByRole('button', { name: '-' })
        ).toBeInTheDocument();
        expect(
            within(item1).getByRole('button', { name: '+' })
        ).toBeInTheDocument();

        expect(within(item1).getByRole('spinbutton')).toHaveValue('2');

        expect(
            within(item1).getByRole('button', {
                name: /remove item from cart/i,
            })
        ).toBeInTheDocument();

        // Bottom part of the modal
        // Should include a tally of all items and a checkout navigation button

        expect(within(cartModal).getByText('Subtotal:')).toBeInTheDocument();
        expect(within(cartModal).getByText('$210')).toBeInTheDocument();
        expect(
            within(cartModal).getByRole('button', { name: /to checkout/i })
        ).toBeInTheDocument();
    });
});
