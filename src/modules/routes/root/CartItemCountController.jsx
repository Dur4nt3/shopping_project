import { InputNumber, ConfigProvider } from 'antd';

// Although sharing similarities, this component isn't the same as "ItemCountController.jsx"
// There are nuances to this component which make it better for usage within the "CartItem" component
export default function CartItemCountController({
    theme,
    quantity,
    setOrderCount,
}) {
    return (
        <div className='item-count-cont'>
            <button
                disabled={quantity <= 1}
                className='decrement-order-count'
                onClick={() => {
                    if (quantity > 1) {
                        setOrderCount(quantity - 1);
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
                    value={quantity}
                    min={1}
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
                disabled={quantity >= 10}
                className='increment-order-count'
                onClick={() => {
                    if (quantity < 10) {
                        setOrderCount(quantity + 1);
                    }
                }}
            >
                +
            </button>
        </div>
    );
}
