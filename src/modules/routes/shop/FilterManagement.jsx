export default function FilterManagement({
    filterName,
    filterValue,
    applied,
    applyFilter,
    activateFilter,
    deactivateFilter,
}) {
    return (
        <div className='filter-management-cont'>
            <div className='filter-activation-cont'>
                {applied ? (
                    <button
                        className='deactivate-filter'
                        type='button'
                        onClick={() => deactivateFilter(filterName)}
                    >
                        Deactivate
                    </button>
                ) : (
                    <button
                        className='activate-filter'
                        type='button'
                        onClick={() => activateFilter(filterName, filterValue)}
                    >
                        Activate
                    </button>
                )}
            </div>
            <button
                disabled={!applied}
                className='apply-filter'
                type='button'
                onClick={() => applyFilter(filterName, filterValue)}
            >
                Apply
            </button>
        </div>
    );
}
