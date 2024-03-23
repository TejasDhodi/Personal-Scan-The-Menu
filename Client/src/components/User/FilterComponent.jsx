import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMultiFilterTrue } from '../../Features/FilterSlice';

const FilterComponent = ({ search, setSearch }) => {

    const dispatch = useDispatch();
    const isShowFilterTrue = useSelector(state => state.filters.multiFilter);

    return (
        <form className="searChFilter"  >
            <div className="filterInputs">
                <input type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                    placeholder='🔍 Search By Name'
                />
                <button type='button' className='filterButton' onClick={() => dispatch(setMultiFilterTrue())}>{isShowFilterTrue && '<-'}Filter {!isShowFilterTrue && '->'}</button>
            </div>
        </form>
    )
}

export default FilterComponent
