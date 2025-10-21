import MainNav from '../root/MainNav';

import '../root/stylesheets/HomeHeader.css';

export default function ShopHeader() {
    return (
        <header>
            <MainNav />
            <div className='header-main'>
                <h1 className='header-text1'>Shop</h1>
                <h3>Fresh finds, just for you.</h3>
            </div>
        </header>
    );
}
