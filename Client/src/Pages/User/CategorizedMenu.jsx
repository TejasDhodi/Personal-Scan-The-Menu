import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import DishesComponent from '../../components/User/DishesComponent';
import FilterComponent from '../../components/User/FilterComponent';
import axios from 'axios'
import MultiFilterComponent from '../../components/User/MultiFilterComponent';

const CategorizedMenu = () => {

  const { filterType, filterValue } = useParams();
  const navigate = useNavigate();

  const dishes = useSelector(state => state.Dish.Dishes);

  const [search, setSearch] = useState('');
  const [checkedItem, setCheckedItem] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [priceRange, setPriceRange] = useState(0);

  const [filteredDishes, setfilteredDishes] = useState([]);
  const [filterByPrice, setFilterByPrice] = useState([]);

  const categorizedDish = useMemo(() => {
    return dishes.filter(item => item[filterType] == filterValue)
  }, [dishes])

  console.log('Categ : ', categorizedDish);


  const handleShowDescription = (dishName) => {
    const selectedDish = dishes.find(item => item.dishName === dishName);
    console.log('Filtered selected Dish : ', selectedDish);

    navigate(`/menu/details/${selectedDish._id}`)

    sessionStorage.setItem('singleDish', dishes && JSON.stringify(selectedDish))
  }

  const handleChecked = (value, item) => {
    let all = [...checkedItem];
    if (value) {
      all.push(item)
    } else {
      all = all.filter(items => items !== item)
    }
    setCheckedItem(all)
  }

  const handleSelectCategory = (value, item) => {
    let all = [];
    if (value) {
      all.push(item)
    } else {
      all = all.filter(items => items !== item)
    }
    setSelectCategory(all)
  }

  const handlePriceRangeFilter = () => {
    const filterPriceRange = filteredDishes.filter(dish => Number(dish.dishPrice) < priceRange)
    setFilterByPrice(filterPriceRange);
  }

  const handleCheckedFilter = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/dishes/filter/check', { checkedItem, selectCategory });
      const data = response.data;

      setfilteredDishes(data?.dishes.filter(item => item[filterType] == filterValue));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (checkedItem.length || selectCategory.length || priceRange.length) > 0 && handleCheckedFilter()
  }, [checkedItem, selectCategory, priceRange])

  useEffect(() => {
    setfilteredDishes(categorizedDish.filter(item => item.dishName.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
  }, [search, checkedItem, categorizedDish])

  useEffect(() => {
    handlePriceRangeFilter();
  }, [priceRange])

  return (
    <div className='categorizedMenu'>
      <div className='menu'>

        <FilterComponent search={search} setSearch={setSearch} />

        <div className='dishContainer' >
          <div className="allDishes">
            {
              (filterByPrice.length === 0 ? filteredDishes : filterByPrice).map((currElem, index) => {
                const { dishName, file, dishIngredients, dishDescription, dishPrice, type, category, _id } = currElem;
                return (
                  <DishesComponent
                    file={file}
                    dishName={dishName}
                    dishIngredients={dishIngredients}
                    dishDescription={dishDescription}
                    dishPrice={dishPrice}
                    type={type}
                    category={category}
                    key={index}
                    currElem={currElem}
                    handleShowDescription={handleShowDescription}
                    _id={_id}
                    dishId={index}
                  />
                )
              })
            }

            {
              filteredDishes.length === 0 && <h1>Item Not Abailable {search ? search : checkedItem} in {filterValue.toLocaleUpperCase()} category</h1>
            }
          </div>
        </div>
      </div>
      <>
        <MultiFilterComponent
          handleChecked={handleChecked}
          handleSelectCategory={handleSelectCategory}
          priceRanges={priceRange}
          setPriceRange={setPriceRange}
        />
      </>
    </div>
  )
}

export default CategorizedMenu
