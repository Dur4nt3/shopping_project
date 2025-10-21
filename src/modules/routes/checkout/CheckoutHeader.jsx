import MainNav from '../root/MainNav';

import '../root/stylesheets/HomeHeader.css';

export default function CheckoutHeader() {
    return (
        <header>
            <MainNav />
            <div className='header-main'>
                <h1 className='header-text1'>Checkout</h1>
                <h3>Almost yours, just one step away.</h3>
            </div>
        </header>
    );
}
