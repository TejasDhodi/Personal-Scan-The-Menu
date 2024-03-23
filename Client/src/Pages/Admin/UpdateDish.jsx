import React, { useEffect, useState } from 'react'
import DishFormComponent from '../../components/Admin/DishFormComponent'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateDish = () => {
    const [inputs, setInputs] = useState({
        dishName: "",
        dishMacros: "",
        dishPrice: "",
        dishDescription: "",
        dishIngredients: "",
        type: "",
        category: "",
        cusine: ""
    })

    const [file, setFile] = useState(null);

    const { id } = useParams()
    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('dishName', inputs.dishName)
            formData.append('dishMacros', inputs.dishMacros)
            formData.append('dishPrice', inputs.dishPrice)
            formData.append('dishDescription', inputs.dishDescription)
            formData.append('dishIngredients', inputs.dishIngredients)
            formData.append('file', file);
            formData.append('type', inputs.type);
            formData.append('category', inputs.category);
            formData.append('cusine', inputs.cusine);

            const response = await axios.put(`http://localhost:3000/api/v1/dishes/update/${id}`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

            if(response.status === 200) {
                alert('Updated');
                navigate('/menuManage')
            }
        } catch (error) {
            console.log('Unable to update the dish : ', error);
        }
    }

    const getDishById = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/dishes/${id}`);
            const data = response.data?.dishdata;

            console.log('single dish', data);

            if (response.status === 200) {
                setInputs({
                    dishName: data.dishName,
                    dishMacros: data.dishMacros,
                    dishPrice: data.dishPrice,
                    dishDescription: data.dishDescription,
                    dishIngredients: data.dishIngredients,
                    type: data.type,
                    category: data.category,
                    cusine: data.cusine
                })

                setFile(data.file)
            }

        } catch (error) {
            console.log('Unable to get the dish by id');
        }
    }

    useEffect(() => {
        getDishById();
    }, [])

    return (
        <div>
            <DishFormComponent
                handleUpdate={handleUpdate}
                handleInputs={handleInputs}
                handleFile={handleFile}
                inputs={inputs}
            />
        </div>
    )
}

export default UpdateDish
