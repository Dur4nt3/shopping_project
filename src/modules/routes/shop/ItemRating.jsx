import { Rate, ConfigProvider } from 'antd';

export default function ItemRating({ theme, rating }) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Rate: {
                        starBg: theme === 'light' ? '#C7C8D9' : '#2A2D3A',
                        starColor: theme === 'light' ? '#3b3d54' : '#4C506B',
                    },
                },
            }}
        >
            <Rate disabled allowHalf value={Math.floor(rating * 2) / 2} />
        </ConfigProvider>
    );
}
