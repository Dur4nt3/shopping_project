import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    render,
    screen,
    waitFor,
    within,
    fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';

import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

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

describe('Test Suite for toggling the filters on and off', () => {
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

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can toggle the rating filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /rating/i })
            ).toBeInTheDocument();
        });

        const ratingFilter = screen.getByRole('button', { name: /rating/i });

        await user.click(ratingFilter);

        const filterContent = screen.getByTestId('filter-content');

        const starsInputs = within(filterContent).getAllByRole('radio');

        // 0-5 stars rating, i.e., 5 stars total
        expect(starsInputs).toHaveLength(5);
        starsInputs.forEach((starInput) =>
            expect(starInput.getAttribute('aria-checked')).toBe('false')
        );

        expect(
            screen.getByRole('button', { name: 'Apply' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();

        await user.click(ratingFilter);

        expect(within(filterContent).queryAllByRole('radio')).toHaveLength(0);
        expect(screen.queryByRole('button', { name: 'Apply' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly interact with the rating filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /rating/i })
            ).toBeInTheDocument();
        });

        const ratingFilter = screen.getByRole('button', { name: /rating/i });

        await user.click(ratingFilter);

        const filterContent = screen.getByTestId('filter-content');

        const starsInputs = within(filterContent).getAllByRole('radio');

        // NOTE: Due to Ant Design's obscure implementation of the "Rate" component
        // I am only able to set the value of the filter to full stars
        // As of 01/11/2025, in this particular case
        // (where i don't have direct access to the onChange function on the "Rate" component)
        // there is no way to simulate a selection of half a star

        // If a star is set to zero (not selected), it and all the next stars must be zero
        // Furthermore, all previous stars must be full
        // E.g., if star 1 is full and star 2 is zero, stars 3-5 are zero
        // There's no need to test that, as this would entail testing Ant Design's component
        fireEvent.click(starsInputs[0]);
        expect(
            starsInputs[0].parentNode.className.includes('ant-rate-star-full')
        ).toBeTruthy();
        expect(
            starsInputs[1].parentNode.className.includes('ant-rate-star-zero')
        ).toBeTruthy();
        fireEvent.click(starsInputs[0]);
        expect(
            starsInputs[0].parentNode.className.includes('ant-rate-star-zero')
        ).toBeTruthy();

        fireEvent.click(starsInputs[1]);
        expect(
            starsInputs[1].parentNode.className.includes('ant-rate-star-full')
        ).toBeTruthy();
        expect(
            starsInputs[2].parentNode.className.includes('ant-rate-star-zero')
        ).toBeTruthy();
        fireEvent.click(starsInputs[2]);
        expect(
            starsInputs[2].parentNode.className.includes('ant-rate-star-full')
        ).toBeTruthy();
        expect(
            starsInputs[3].parentNode.className.includes('ant-rate-star-zero')
        ).toBeTruthy();

        fireEvent.click(starsInputs[0]);
        expect(
            starsInputs[0].parentNode.className.includes('ant-rate-star-full')
        ).toBeTruthy();
        expect(
            starsInputs[1].parentNode.className.includes('ant-rate-star-zero')
        ).toBeTruthy();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can filter items based on rating', async () => {
        // Tests:
        // Deactivate -> should see all items
        // Switch tabs -> should retain 4 stars data
        // Activate -> should see 3 items

        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /rating/i })
            ).toBeInTheDocument();
        });

        const ratingFilter = screen.getByRole('button', { name: /rating/i });
        const priceFilter = screen.getByRole('button', {
            name: /price/i,
        });

        await user.click(ratingFilter);

        const filterContent = screen.getByTestId('filter-content');

        const starsInputs = within(filterContent).getAllByRole('radio');

        await user.click(starsInputs[4]);

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?rating=5');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect(
            screen.getByRole('heading', { name: /no items found.../i })
        ).toBeInTheDocument();

        await user.click(starsInputs[4]);

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?rating=0');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(10);

        await user.click(starsInputs[3]);

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?rating=4');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(3);
        expect(
            screen.getByRole('heading', { name: 'Item 3' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Item 4' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Item 8' })
        ).toBeInTheDocument();

        await user.click(priceFilter);
        await user.click(ratingFilter);

        expect(
            starsInputs[3].parentNode.className.includes('ant-rate-star-full')
        ).toBeTruthy();
        expect(
            starsInputs[4].parentNode.className.includes('ant-rate-star-zero')
        ).toBeTruthy();

        await user.click(screen.getByRole('button', { name: 'Deactivate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('');
        });

        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Activate' })
        ).toBeInTheDocument();

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(10);

        await user.click(priceFilter);
        await user.click(ratingFilter);

        expect(
            starsInputs[3].parentNode.className.includes('ant-rate-star-full')
        ).toBeTruthy();
        expect(
            starsInputs[4].parentNode.className.includes('ant-rate-star-zero')
        ).toBeTruthy();

        await user.click(screen.getByRole('button', { name: 'Activate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?rating=4');
        });

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(3);
        expect(
            screen.getByRole('heading', { name: 'Item 3' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Item 4' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Item 8' })
        ).toBeInTheDocument();

        expect(screen.queryByRole('button', { name: 'Activate' })).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();
    }, 15000);
});
