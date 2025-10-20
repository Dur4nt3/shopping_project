import backgroundSvgGenerator from '../../utilities/backgroundSvgGenerator';

import cartSvg from '../../../assets/media/icons/light/cart.svg';
import basketSvg from '../../../assets/media/icons/general/basket.svg';

import './stylesheets/FloatingBackground.css';

export default function FloatingBackground() {
    const svg1 = <img src={cartSvg} />;
    const svg2 = <img src={basketSvg} />;
    const svgArray = backgroundSvgGenerator(
        svg1,
        cartSvg,
        24,
        24,
        1.2,
        7
    ).concat(backgroundSvgGenerator(svg2, basketSvg, 24, 24, 1.2, 7));

    return (
        <div className='svg-wrap'>
            {svgArray.map((svg, index) => (
                <div key={`float${index}`}>{svg}</div>
            ))}
        </div>
    );
}
