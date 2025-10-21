import { InputNumber, ConfigProvider } from 'antd';

import clearLight from '../../../assets/media/icons/light/delete.svg';
import clearDark from '../../../assets/media/icons/dark/delete.svg';

export default function PriceFilterInputs({
    theme,
    fromRef,
    toRef,
    currentPriceRange,
    setCurrentPriceRange,
    priceRange,
}) {
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        InputNumber: {
                            colorBgContainer:
                                theme === 'light' ? '#f7f8fa' : '#040609',
                            colorBorder:
                                theme === 'light' ? '#C7C8D9' : '#2A2D3A',
                            colorText:
                                theme === 'light' ? '#121212' : '#f8fafc',
                            activeBorderColor:
                                theme === 'light' ? '#3b3d54' : '#3e4252',
                            activeShadow: 'none',
                        },
                    },
                }}
            >
                <div className='price-filter-inputs'>
                    <label
                        htmlFor='price-from'
                        className='price-from-label'
                        onClick={(event) => {
                            if (event.target.tagName !== 'INPUT') {
                                fromRef.current.focus({ cursor: 'end' });
                            }
                        }}
                    >
                        <p>From</p>
                        <InputNumber
                            value={currentPriceRange[0]}
                            min={0}
                            max={currentPriceRange[1]}
                            controls={false}
                            step={1}
                            precision={2}
                            variant='underlined'
                            id='price-from'
                            ref={fromRef}
                            onChange={(value) =>
                                setCurrentPriceRange([
                                    value,
                                    currentPriceRange[1],
                                ])
                            }
                        />
                        <button
                            className='clear-from-price'
                            onClick={() =>
                                setCurrentPriceRange([
                                    priceRange[0],
                                    currentPriceRange[1],
                                ])
                            }
                        >
                            <img
                                src={theme === 'light' ? clearLight : clearDark}
                                alt='clear from price'
                            />
                        </button>
                    </label>
                    <label
                        htmlFor='price-to'
                        className='price-to-label'
                        onClick={(event) => {
                            if (event.target.tagName !== 'INPUT') {
                                toRef.current.focus({ cursor: 'end' });
                            }
                        }}
                    >
                        <p>To</p>
                        <InputNumber
                            value={currentPriceRange[1]}
                            min={currentPriceRange[0]}
                            controls={false}
                            step={1}
                            precision={2}
                            variant='underlined'
                            id='price-to'
                            ref={toRef}
                            onChange={(value) =>
                                setCurrentPriceRange([
                                    currentPriceRange[0],
                                    value,
                                ])
                            }
                        />
                        <button
                            className='clear-to-price'
                            onClick={() =>
                                setCurrentPriceRange([
                                    currentPriceRange[0],
                                    priceRange[1],
                                ])
                            }
                        >
                            <img
                                src={theme === 'light' ? clearLight : clearDark}
                                alt='clear to price'
                            />
                        </button>
                    </label>
                </div>
            </ConfigProvider>
        </>
    );
}
