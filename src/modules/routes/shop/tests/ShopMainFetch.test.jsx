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

    it('Displays an error when a request fails', async () => {
        await waitFor(() => {
            expect(screen.getByText('An Error Occurred!')).toBeInTheDocument();
        });
        expect(
            // eslint-disable-next-line quotes
            screen.getByText("Couldn't load items due to an internal error.")
        ).toBeInTheDocument();
    });

    it('Displays a loader before items are loaded', async () => {
        // The loader is displayed and there are no items
        await waitFor(() => {
            expect(screen.getByText('Loading Items...')).toBeInTheDocument();
            expect(screen.queryByTestId('shop-items-grid')).toBeNull();
        });

        // Loader is removed, items are displayed
        // 'waitForElementToBeRemoved' is inconsistent here, as it throws if the element is removed before it is executed
        // Therefore, if the items are loaded before reaching this point, said function will throw and fail the test
        await waitFor(() => {
            expect(screen.queryByText('Loading Items...')).toBeNull();
            expect(
                Array.from(screen.getByTestId('shop-items-grid').children)
                    .length
            ).toBe(10);
        });
    });

    it('Displays each of the returned items', async () => {
        // All 10 items are loaded
        await waitFor(() => {
            expect(
                Array.from(screen.getByTestId('shop-items-grid').children)
            ).toHaveLength(10);
        });

        const item1 = screen.getByRole('heading', { name: 'Item 1' });
        const item2 = screen.getByRole('heading', { name: 'Item 2' });
        const item3 = screen.getByRole('heading', { name: 'Item 3' });
        const item4 = screen.getByRole('heading', { name: 'Item 4' });
        const item5 = screen.getByRole('heading', { name: 'Item 5' });
        const item6 = screen.getByRole('heading', { name: 'Item 6' });
        const item7 = screen.getByRole('heading', { name: 'Item 7' });
        const item8 = screen.getByRole('heading', { name: 'Item 8' });
        const item9 = screen.getByRole('heading', { name: 'Item 9' });
        const item10 = screen.getByRole('heading', { name: 'Item 10' });

        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
        expect(item3).toBeInTheDocument();
        expect(item4).toBeInTheDocument();
        expect(item5).toBeInTheDocument();
        expect(item6).toBeInTheDocument();
        expect(item7).toBeInTheDocument();
        expect(item8).toBeInTheDocument();
        expect(item9).toBeInTheDocument();
        expect(item10).toBeInTheDocument();
    });

    it('Properly displays the returned items', async () => {
        // All items are loaded
        await waitFor(() => {
            expect(
                Array.from(screen.getByTestId('shop-items-grid').children)
            ).toHaveLength(10);
        });

        // If 1 item is displaying correctly, all of them are (same component structure)
        // This test and the above test accomplish the task of answering the question:
        // Are all items being displayed and are they displaying as expected
        const item = screen.getByRole('heading', { name: 'Item 1' }).parentNode;

        // All the headings in the container
        // Should be: item title, item category, and item price (in order)
        const containerHeadings = within(item).getAllByRole('heading');

        expect(containerHeadings[0]).toHaveTextContent('Item 1');
        expect(containerHeadings[1]).toHaveTextContent(/category 1/i);
        expect(within(item).getByAltText('Item 1')).toBeInTheDocument();

        // Ensuring rating is displayed correctly
        // This method is used to ensure compatibility with Ant Design components
        const fullStars = [
            ...item.querySelectorAll('.ant-rate-star-full'),
        ].filter((item) => item !== null);
        const halfStars = [
            ...item.querySelectorAll('.ant-rate-star-half'),
        ].filter((item) => item !== null);
        const emptyStars = [
            ...item.querySelectorAll('.ant-rate-star-zero'),
        ].filter((item) => item !== null);

        expect(fullStars).toHaveLength(3);
        expect(halfStars).toHaveLength(1);
        expect(emptyStars).toHaveLength(1);

        expect(within(item).getByTestId('rating-count').textContent).toBe(
            '(120 Reviews)'
        );

        expect(containerHeadings[2]).toHaveTextContent('10$');

        expect(
            within(item).getByRole('button', { name: '-' })
        ).toBeInTheDocument();
        expect(
            within(item).getByRole('button', { name: '+' })
        ).toBeInTheDocument();

        // The accessible name of a number input is a spin button
        // This is the order count input
        expect(within(item).getByRole('spinbutton')).toBeInTheDocument();

        expect(
            within(item).getByRole('button', { name: 'Add to Cart' })
        ).toBeInTheDocument();
    });
});
