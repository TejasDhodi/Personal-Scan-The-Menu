import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MultiFilterComponent = ({ handleChecked, handleSelectCategory, priceRanges, setPriceRange }) => {
    const { filterType, filterValue } = useParams();

    const dishes = useSelector(state => state.Dish.Dishes);
    const isShowFilterTrue = useSelector(state => state.filters.multiFilter);

    const categories = dishes && [...new Set(dishes.map((currElem) => currElem.category))];
    const types = dishes && [...new Set(dishes.map((currElem) => currElem.cusine))]
    const prices = dishes && [...new Set(dishes.map((currElem) => currElem.dishPrice))];
    console.log('new Categ : ', categories);
    console.log('new Prices : ', prices);

    const handleCusineFilter = (item, value) => {
        handleSelectCategory(item, value);
        setPriceRange(0);
    }

    return (
        <>
            <div className={isShowFilterTrue? 'multiFilter shoMultiFilter': 'multiFilter'}>
                <form className='cusineFilter filters'>
                    {
                        filterType == 'cusine' ?
                            types.map((currElem, index) => {
                                return <div className='checkBoxes' key={index}>
                                    <label htmlFor={currElem} className={(filterValue !== currElem) ? 'checkbox disableCheck' : 'checkbox'}> {currElem.toLocaleUpperCase()} </label>
                                    <input type="checkbox"
                                        name={currElem}
                                        id={currElem}
                                        value={currElem}
                                        onChange={(e) => handleChecked(e.target.checked, currElem)}
                                        disabled={filterType == 'cusine' && filterValue !== currElem}
                                        checked={filterType == 'cusine' && filterValue === currElem}
                                    />
                                </div>
                            })
                            :
                            types.map((currElem, index) => {
                                return <div className='checkBoxes' key={index}>
                                    <label htmlFor={currElem} className='inputLabel'> {currElem.toLocaleUpperCase()} </label>
                                    <input type="checkbox"
                                        name={currElem}
                                        id={currElem}
                                        value={currElem}
                                        onChange={(e) => handleChecked(e.target.checked, currElem)}
                                    />
                                </div>
                            })
                    }
                </form>

                <form className="categoryFilter filters">
                    <select name="categoryFilter" id="categoryFilter" onChange={(e) => handleCusineFilter(e.target.name, e.target.value)}>
                        <option value="" disabled>Select Category</option>
                        {
                            categories.map((currElem, index) => {
                                return <option value={currElem} key={index}>{currElem}</option>
                            })
                        }
                    </select>
                </form>

                <form action="" className="priceFilter filters">
                    <label htmlFor="priceRange">0 - {priceRanges}</label> <br />
                    <input type="range" name="priceRange" id='priceRange' min={0} max={1000} value={priceRanges} onChange={(e) => setPriceRange(e.target.value)} />
                </form>
            </div>
        </>
    )
}

export default MultiFilterComponent
