import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

import Root from '../Root';
import RootError from '../RootError';

import { items } from '../../shop/tests/utilities/mockedItems';

window.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(items),
    })
);

const routes = [
    {
        path: '/',
        element: <Root />,
        errorElement: <RootError />,
    },
];

let router;
let user;
let container;

describe('Test Suite For The Homepage Header', () => {
    beforeEach(() => {
        router = createMemoryRouter(routes, {
            initialEntries: ['/nonexistent'],
            initialIndex: 0,
        });
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

    it('Renders the error page (snapshot test)', () => {
        expect(container).toMatchSnapshot();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Navigates back to the homepage when clicking the return button', async () => {
        const returnButton = screen.getByRole('link', { name: /homepage/i });
        await user.click(returnButton);
        expect(router.state.location.pathname).toBe('/');
    });
});
