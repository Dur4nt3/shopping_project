import { InputNumber, ConfigProvider } from 'antd';

export default function ItemCountController({
    theme,
    orderCount,
    setOrderCount,
}) {
    return (
        <div className='item-count-cont'>
            <button
                className='decrement-order-count'
                onClick={() => {
                    if (orderCount > 0) {
                        setOrderCount(orderCount - 1);
                    }
                }}
            >
                -
            </button>
            <ConfigProvider
                theme={{
                    components: {
                        InputNumber: {
                            colorBgContainer:
                                theme === 'light' ? '#F6F7FB' : '#0A0C12',
                            colorBorder:
                                theme === 'light' ? '#C7C8D9' : '#2A2D3A',
                            colorText:
                                theme === 'light' ? '#121212' : '#f8fafc',
                            hoverBg: theme === 'light' ? '#edeff8' : '#12151d',
                            activeBg: theme === 'light' ? '#edeff8' : '#12151d',
                            hoverBorderColor:
                                theme === 'light' ? '#c3c6e0' : '#3e4252',
                            activeBorderColor:
                                theme === 'light' ? '#c3c6e0' : '#3e4252',
                            activeShadow: 'none',
                        },
                    },
                }}
            >
                <InputNumber
                    value={orderCount}
                    min={0}
                    max={10}
                    controls={false}
                    step={1}
                    precision={0}
                    style={{ textAlignLast: 'center' }}
                    onChange={(value) => {
                        setOrderCount(value);
                    }}
                />
            </ConfigProvider>
            <button
                className='increment-order-count'
                onClick={() => {
                    if (orderCount < 10) {
                        setOrderCount(orderCount + 1);
                    }
                }}
            >
                +
            </button>
        </div>
    );
}
