export default function FilterManagement({
    applied,
    applyFilter,
    toggleFilter,
}) {
    return (
        <div className='filter-management-cont'>
            <div className='filter-activation-cont'>
                {applied ? (
                    <button className='deactivate-filter' type='button' onClick={() => toggleFilter('category')}>
                        Deactivate
                    </button>
                ) : (
                    <button className='activate-filter' type='button' onClick={() => toggleFilter('category')}>
                        Activate
                    </button>
                )}
            </div>
            <button className='apply-filter' type='button' onClick={() => applyFilter()}>
                Apply
            </button>
        </div>
    );
}
