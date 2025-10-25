import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Select, ConfigProvider } from 'antd';
import { Theme } from '../../utilities/Theme';
import { CaretDownFilled } from '@ant-design/icons';

import FilterManagement from './FilterManagement';

function createSelectOptions(categories) {
    const options = [];
    for (const category of categories) {
        options.push({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1),
        });
    }

    return options;
}

export default function ShopCategoryFilter({
    currentCategoryFilter,
    applied,
    toggleFilter,
    categories,
}) {
    const { theme } = useContext(Theme);
    const selectOptions = createSelectOptions(categories);

    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentlySelected, setCurrentlySelected] = useState(
        currentCategoryFilter
    );

    function applyFilter() {
        if (currentlySelected !== null) {
            setSearchParams((searchParams) => {
                searchParams.set(
                    'category',
                    encodeURIComponent(currentlySelected)
                );
                return searchParams;
            });
        }
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            colorTextPlaceholder:
                                theme === 'light' ? '#121212' : '#f8fafc',
                            selectorBg:
                                theme === 'light' ? '#F6F7FB' : '#0A0C12',
                            colorBorder:
                                theme === 'light' ? '#C7C8D9' : '#2A2D3A',
                            hoverBorderColor:
                                theme === 'light' ? '#C3C6E0' : '#3E4252',
                            activeBorderColor:
                                theme === 'light' ? '#3b3d54' : '#2f3447',
                            activeOutlineColor: 'none',
                            optionActiveBg:
                                theme === 'light' ? '#EDEFF8' : '#12151D',
                            optionSelectedBg:
                                theme === 'light' ? '#3b3d54' : '#2f3447',
                            optionSelectedColor: '#f8fafc',
                            colorBgElevated:
                                theme === 'light' ? '#F6F7FB' : '#0A0C12',
                            colorText:
                                theme === 'light' ? '#121212' : '#f8fafc',
                        },
                    },
                }}
            >
                {currentlySelected !== null ? (
                    <Select
                        suffixIcon={
                            theme === 'light' ? (
                                <CaretDownFilled style={{ color: '#C7C8D9' }} />
                            ) : (
                                <CaretDownFilled style={{ color: '#2A2D3A' }} />
                            )
                        }
                        style={{ width: '100%' }}
                        value={currentlySelected}
                        placeholder='Filter by category'
                        onChange={(value) => setCurrentlySelected(value)}
                        options={selectOptions}
                    />
                ) : (
                    <Select
                        suffixIcon={
                            theme === 'light' ? (
                                <CaretDownFilled style={{ color: '#C7C8D9' }} />
                            ) : (
                                <CaretDownFilled style={{ color: '#2A2D3A' }} />
                            )
                        }
                        style={{ width: '100%' }}
                        placeholder='Filter by category'
                        onChange={(value) => setCurrentlySelected(value)}
                        options={selectOptions}
                    />
                )}
            </ConfigProvider>
            <FilterManagement
                applied={applied}
                applyFilter={applyFilter}
                toggleFilter={toggleFilter}
            />
        </>
    );
}
