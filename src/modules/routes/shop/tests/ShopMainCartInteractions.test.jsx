import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

import Shop from '../../shop/Shop';
import Checkout from '../../checkout/Checkout';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

window.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(items),
    })
);

// No need for localStorage in this test
// This means different tests DO NOT share the same cart
// E.g., items added in 1 test will not show up in another (clear cart every test)
window.localStorage = {
    getItem() {
        return null;
    },
    setItem() {
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

let itemCont;
let addToCart;
let numberInput;
let incrementButton;
let decrementButton;

describe('Test Suite for adding items to cart', () => {
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

        await waitFor(() => {
            expect(
                Array.from(screen.getByTestId('shop-items-grid').children)
            ).toHaveLength(10);
        });

        itemCont = screen.getByRole('heading', {
            name: 'Item 1',
        }).parentNode;

        addToCart = within(itemCont).getByRole('button', {
            name: /add to cart/i,
        });

        decrementButton = within(itemCont).getByRole('button', {
            name: '-',
        });
        incrementButton = within(itemCont).getByRole('button', {
            name: '+',
        });
        numberInput = within(itemCont).getByRole('spinbutton');
    });

    it('Can not add items with quantity 0', async () => {
        // Adding a 0 quantity item
        await user.click(addToCart);

        // Error displayed (text changes, animation plays, classList changes)
        await waitFor(() => {
            expect(
                within(itemCont).getByRole('button', {
                    name: /invalid quantity/i,
                })
            ).toBeInTheDocument();
        });

        // The button should revert back after 1250ms
        await waitFor(
            () => {
                expect(
                    within(itemCont).getByRole('button', {
                        name: /add to cart/i,
                    })
                ).toBeInTheDocument();
            },
            { timeout: 1500 }
        );

        // The same should occur when pressing enter on the number input
        await user.type(numberInput, '{Enter}');

        await waitFor(() => {
            expect(
                within(itemCont).getByRole('button', {
                    name: /invalid quantity/i,
                })
            ).toBeInTheDocument();
        });

        await waitFor(
            () => {
                expect(
                    within(itemCont).getByRole('button', {
                        name: /add to cart/i,
                    })
                ).toBeInTheDocument();
            },
            { timeout: 1500 }
        );
    }, 10000);

    // Tests for the increment and decrement buttons are below this one
    it('Can add items to cart', async () => {
        await user.type(numberInput, '{Backspace}2');

        await user.click(addToCart);

        await waitFor(() => {
            expect(
                within(itemCont).getByRole('button', {
                    name: /success/i,
                })
            ).toBeInTheDocument();
        });

        await waitFor(
            () => {
                expect(
                    within(itemCont).getByRole('button', {
                        name: /add to cart/i,
                    })
                ).toBeInTheDocument();
            },
            { timeout: 1500 }
        );

        expect(numberInput).toHaveValue('0');

        // Pressing enter also allows to add to cart
        await user.type(numberInput, '{Backspace}5{Enter}');

        await waitFor(() => {
            expect(
                within(itemCont).getByRole('button', {
                    name: /success/i,
                })
            ).toBeInTheDocument();
        });

        await waitFor(
            () => {
                expect(
                    within(itemCont).getByRole('button', {
                        name: /add to cart/i,
                    })
                ).toBeInTheDocument();
            },
            { timeout: 1500 }
        );

        expect(numberInput).toHaveValue('0');
    }, 10000);

    it('Can properly utilize the increment and decrement buttons', async () => {
        expect(decrementButton).toBeDisabled();

        await user.click(incrementButton);
        await user.click(incrementButton);

        expect(numberInput).toHaveValue('2');

        await user.click(decrementButton);

        expect(numberInput).toHaveValue('1');

        for (let i = 0; i <= 8; i += 1) {
            await user.click(incrementButton);
        }

        expect(numberInput).toHaveValue('10');

        expect(incrementButton).toBeDisabled();

        // NOTE: This test doesn't need to include adding to the cart
        // The previous tests already determined that said functionality is already working as intended
    }, 10000);

    it('Can not add more than 10 of the same item to the cart', async () => {
        await user.type(numberInput, '{Backspace}10{Enter}');

        // Just ensuring the items were added before proceeding
        await waitFor(() => {
            expect(
                within(itemCont).getByRole('button', {
                    name: /success/i,
                })
            ).toBeInTheDocument();
        });

        await waitFor(
            () => {
                expect(
                    within(itemCont).getByRole('button', {
                        name: /add to cart/i,
                    })
                ).toBeInTheDocument();
            },
            { timeout: 1500 }
        );

        await user.type(numberInput, '{Backspace}1{Enter}');

        await waitFor(() => {
            expect(
                within(itemCont).getByRole('button', {
                    name: 'Exceeded Max (Check Cart)',
                })
            ).toBeInTheDocument();
        });

        await waitFor(
            () => {
                expect(
                    within(itemCont).getByRole('button', {
                        name: /add to cart/i,
                    })
                ).toBeInTheDocument();
            },
            { timeout: 1500 }
        );
    }, 10000);
});
