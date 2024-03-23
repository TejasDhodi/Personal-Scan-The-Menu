import React from 'react'
import { dishCategories, dishCusines, dishTypes, inputFields } from '../../Service/Admin';

const DishFormComponent = ({handleSubmit, handleUpdate, handleInputs, handleFile, inputs, focusDishName}) => {
    
    return (
        <form className='addDishDetails' onSubmit={handleSubmit? handleSubmit : handleUpdate}>
            <h2>Add Dish</h2>

            <div className="dishTitle">
                <div className="inputs">
                    <label htmlFor="dishName">Dish Name</label>
                    <input type="text" id='dishName' name='dishName' value={inputs.dishName} onChange={handleInputs} placeholder='Add Dish Title' ref={focusDishName} required />
                </div>
            </div>

            <div className="dishData">

                <div className="inputs">
                    <label htmlFor="dishImage">Dish Image</label>
                    <input type='file' id='dishImage' onChange={handleFile} required />
                </div>

                {
                    inputFields.map((field, index) => {
                        const { name, label, type, ref, rows, col } = field;
                        return (
                            <div className="inputs" key={index}>
                                <label htmlFor={name} key={index * 2}>{label}</label>
                                {
                                    type === 'textarea' ? (
                                        <textarea
                                            id={name}
                                            name={name}
                                            value={inputs[name]}
                                            onChange={handleInputs}
                                            placeholder={`Add ${label}`}
                                            rows={rows}
                                            cols={col}
                                            required
                                        />
                                    ) : (
                                        <input
                                            type={type}
                                            id={name}
                                            name={name}
                                            value={inputs[name]}
                                            onChange={handleInputs}
                                            placeholder={`Add ${label}`}
                                            ref={ref}
                                            required={type !== 'file'}
                                        />
                                    )
                                }
                            </div>
                        )
                    })
                }

                <div className="inputs">
                    <label htmlFor="type">Type</label>
                    <select name="type" value={inputs.type} onChange={handleInputs} id="type">
                        <option value='' disabled>Select Type</option>
                        {
                            dishTypes.map((types, index) => {
                                const { name, value } = types;
                                return (
                                    <option value={value} key={index * 3}>{name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="inputs">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={inputs.category} onChange={handleInputs} id="category">
                        <option value='' disabled>Select Category</option>
                        {
                            dishCategories.map((category, index) => {
                                const { names } = category;
                                return (
                                    <option value={names} key={index * 4}>{names}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="inputs">
                    <label htmlFor="cusine">Cusine</label>
                    <select name="cusine" id="cusine" value={inputs.cusine} onChange={handleInputs}>
                        <option value="" disabled>Select Cusine</option>
                        {
                            dishCusines.map((cusines, index) => {
                                const { names } = cusines;
                                return (
                                    <option value={names} key={index * 5}>{names}</option>
                                )
                            })
                        }
                    </select>
                </div>

            </div>

            <div className="controls">
                <button type="submit">{handleUpdate? 'Update': 'Add Dish'}</button>
            </div>

        </form>
    )
}

export default DishFormComponent
