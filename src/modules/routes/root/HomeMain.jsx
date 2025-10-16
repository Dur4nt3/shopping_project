import './stylesheets/HomeMain.css';

import checkSvg from '../../../assets/media/icons/general/check.svg';
import returnSvg from '../../../assets/media/icons/general/return.svg';
import internationalSvg from '../../../assets/media/icons/general/international.svg';

export default function HomeMain() {
    return (
        <main>
            <h1>Experience Shopping,</h1>
            <h1><span className="modified-heading">Redefined</span>.</h1>
            <p>
                Discover a seamless way to browse, compare, and buy where
                simplicity meets style.
            </p>

            <div className='highlights'>
                <div className='highlight-section'>
                    <img src={checkSvg} />
                    <h2>Authentic Gear</h2>
                    <p>Authentic products from trusted top brands</p>
                </div>
                <div className='highlight-section'>
                    <img src={returnSvg} />
                    <h2>Easy Returns</h2>
                    <p>Easily return items within thirty days</p>
                </div>
                <div className='highlight-section'>
                    <img src={internationalSvg} />
                    <h2>Fast Shipping</h2>
                    <p>Fast and reliable delivery to your door</p>
                </div>
            </div>
        </main>
    );
}
