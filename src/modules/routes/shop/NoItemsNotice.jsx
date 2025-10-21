import emptyLight from '../../../assets/media/icons/light/empty.svg';
import emptyDark from '../../../assets/media/icons/dark/empty.svg';

export default function NoItemsNotice({ theme }) {
    return <div className='no-items-cont'>
        <img src={theme === 'light' ? emptyLight : emptyDark} />
        <h3 className='no-items-notice'>No Items Found...</h3>
        <h4>Adjust your filters and try again.</h4>
    </div>
}