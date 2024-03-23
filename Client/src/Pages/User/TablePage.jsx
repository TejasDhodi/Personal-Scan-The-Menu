import React, { useEffect, useState } from 'react'
import { tableNumberData } from '../../Service/User'
import axios from 'axios'

const TablePage = () => {
    const [occupiedTable, setOccupiedTable] = useState([]);
    const [occupiedTableNo, setOccupiedtableNo] = useState([]);
    const handleOccupiedTable = async () => {
        try {
            const response = await axios.get('https://personal-scan-the-menu.onrender.com/api/v1/occupied');
            const data = response.data?.getTableNo;

            if (response.status === 200) {
                setOccupiedTable(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleOccupiedTable();
        console.log(occupiedTable);
    }, [])

    useEffect(() => {
        const receivedTableNo = occupiedTable.map(item => item.tableNo);
        setOccupiedtableNo(receivedTableNo)
    }, [occupiedTable])

    return (
        <div className='tableDetails'>
            <div className="indicatorContainer">
                <div className="available indicators">
                    <h3>Available Table</h3>
                    <span></span>
                </div>
                <div className="occupied indicators">
                    <h3>Occupied Table</h3>
                    <span></span>
                </div>
            </div>
            <div className="tableContainer">
                {
                    tableNumberData.map((table, index) => (
                        <div className={(occupiedTableNo.includes(table)) ? "tables occupiedTable" : "tables"}>{table}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default TablePage
