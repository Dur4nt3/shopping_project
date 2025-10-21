import { useContext, useState } from 'react';
import { Rate, ConfigProvider } from 'antd';
import { Theme } from '../../utilities/Theme';

import FilterManagement from './FilterManagement';

export default function ShopRatingFilter({
    currentRatingFilter,
    applied,
    applyFilter,
    activateFilter,
    deactivateFilter,
}) {
    const { theme } = useContext(Theme);

    const [currentRating, setCurrentRating] = useState(
        currentRatingFilter !== null ? currentRatingFilter : 0
    );

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Rate: {
                            starBg: theme === 'light' ? '#C7C8D9' : '#2A2D3A',
                            starColor:
                                theme === 'light' ? '#3b3d54' : '#f8fafc',
                            starSize: '24px',
                        },
                    },
                }}
            >
                <div
                    className={
                        !applied ? 'rate-filter-wrapper rating-disabled' : 'rate-filter-wrapper'
                    }
                >
                    <Rate
                        disabled={!applied}
                        allowHalf
                        value={currentRating}
                        onChange={(value) => setCurrentRating(value)}
                    />
                </div>
            </ConfigProvider>
            <FilterManagement
                filterName='rating'
                filterValue={currentRating}
                applied={applied}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        </>
    );
}
