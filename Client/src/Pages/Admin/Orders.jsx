import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import OrderTable from '../../components/Admin/OrderTable';
import '../../Styles/Admin/AdminPages.css'
import { IoMdDoneAll } from "react-icons/io";
import { MdRemoveDone } from "react-icons/md";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {

  const [pendingOrders, setPendingOrders] = useState([]);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [occupiedTable, setOccupiedTable] = useState([]);
  const [showTable, setShowTable] = useState('pending');

  const [pageLimit, setPageLimit] = useState(5);
  const [pendingPageCount, setPendingPageCount] = useState(1);
  const [deliveredPageCount, setDeliveredPageCount] = useState(1);
  const [processingPageCount, setProcessingPageCount] = useState(1);
  const [occupiedPageCount, setOccupiedPageCount] = useState(1);

  const pendingCurrentPage = useRef();
  const processingCurrentPage = useRef();
  const deliveredCurrentPage = useRef();
  const occupiedCurrentPage = useRef();

  const handlePageClick = (e) => {
    try {
      console.log(e.selected + 1);
      pendingCurrentPage.current = e.selected + 1
      processingCurrentPage.current = e.selected + 1
      deliveredCurrentPage.current = e.selected + 1
      occupiedCurrentPage.current = e.selected + 1

      if (showTable === 'pending') {
        handleGetPendingOrders();
      } else if (showTable === 'processing') { // Fetch processing orders
        handleGetProcessingOrders();
      } else if (showTable === 'delivered') {
        handleGetDeliveredOrders();
      } else {
        handleGetOccupiedTable();
      }

    } catch (error) {
      console.log('handlePageClick : ', error);
    }
  }

  // To Get Pending Orders
  const handleGetPendingOrders = async () => {
    try {
      const response = await axios.get(`https://personal-scan-the-menu.onrender.com/api/v1/orders/pending?page=${pendingCurrentPage.current}&limit=${pageLimit}`);
      const data = response.data;
      setPendingPageCount(data?.result.pageCount);
      setPendingOrders(data?.result.paginatedResult);
      console.log('pend pag res', data);
    } catch (error) {
      console.log('Unable to get Pending orders : ', error);
    }
  };

  // To Get Processsing Orders
  const handleGetProcessingOrders = async () => {
    try {
      const response = await axios.get(`https://personal-scan-the-menu.onrender.com/api/v1/orders/processing?page=${deliveredCurrentPage.current}&limit=${pageLimit}`);
      const data = response.data;
      setProcessingPageCount(data?.result.pageCount);
      setProcessingOrders(data?.result.paginatedResult);
    } catch (error) {
      console.log('Unable to get Delivered orders: ', error);
    }
  }

  // To Get Delivered Orders
  const handleGetDeliveredOrders = async () => {
    try {
      const response = await axios.get(`https://personal-scan-the-menu.onrender.com/api/v1/orders/delivered?page=${deliveredCurrentPage.current}&limit=${pageLimit}`);
      const data = response.data;
      setDeliveredPageCount(data?.result.pageCount);
      setDeliveredOrders(data?.result.paginatedResult);
    } catch (error) {
      console.log('Unable to get Delivered orders: ', error);
    }
  };

  // To Get Occupied Tables

  const handleGetOccupiedTable = async () => {
    try {
      const response = await axios.get(`https://personal-scan-the-menu.onrender.com/api/v1/orders/paid?page=${occupiedCurrentPage.current}&limit=${pageLimit}`);
      const data = response.data;
      setOccupiedPageCount(data?.result.pageCount);
      setOccupiedTable(data?.result.paginatedResult);
      console.log(' occ res : ',data?.result.paginatedResult);
      // console.log(' occ res 1 : ',data?.result);
    } catch (error) {
      console.log('Unable to get Delivered orders: ', error);
    }
  }


  // To Update Processing status false
  const handleProcessingUpdateStatusTrue = async (id) => {
    try {
      const response = await axios.put(`https://personal-scan-the-menu.onrender.com/api/v1/orders/processing/${id}`);
      const data = response.data;

      toast.success(data.message, {
        autoClose: 1500
      })

      console.log('Updated Data : ', data);
      if (response.status === 200) {
        handleGetPendingOrders();
        handleGetDeliveredOrders();
        handleGetProcessingOrders();
        handleGetOccupiedTable();

      }
    } catch (error) {
      console.log('Unable to set status true or order not found: ', error);
    }
  }

  // To Update Delivery Status true
  const handleDeliveryUpdateStatusTrue = async (id) => {
    try {
      const response = await axios.put(`https://personal-scan-the-menu.onrender.com/api/v1/orders/delivered/${id}`);
      const data = response.data;

      toast.success(data.message, {
        autoClose: 1500
      })

      console.log('Updated Data : ', data);
      if (response.status === 200) {
        handleGetPendingOrders();
        handleGetDeliveredOrders();
        handleGetProcessingOrders();
        handleGetOccupiedTable();

      }
    } catch (error) {
      console.log('Unable to set status true or order not found: ', error);
    }
  }

  // To Update delivery status false
  const handleUpdateDeliveryStatusFalse = async (id) => {
    try {
      const response = await axios.put(`https://personal-scan-the-menu.onrender.com/api/v1/orders/undoDelivered/${id}`);
      const data = response.data;

      toast.success(data.message, {
        autoClose: 1500
      })

      console.log('Updated Data : ', data);
      if (response.status === 200) {
        handleGetPendingOrders();
        handleGetDeliveredOrders();
        handleGetProcessingOrders();
        handleGetOccupiedTable();

      }
    } catch (error) {
      console.log('Unable to set status true or order not found: ', error);
    }
  }

  // To Mark Order as paid 
  const handleMarkOrderAsPaid = async (id) => {
    try {
      const response = await axios.put(`https://personal-scan-the-menu.onrender.com/api/v1/orders/markPaid/${id}`);
      const data = response.data;

      toast.success(data.message, {
        autoClose: 1500
      })

      console.log('Updated Data : ', data);
      if (response.status === 200) {
        handleGetPendingOrders();
        handleGetDeliveredOrders();
        handleGetProcessingOrders();
        handleGetOccupiedTable();

      }
    } catch (error) {
      console.log('Unable to set status true or order not found: ', error);
    }
  }

  useEffect(() => {

    pendingCurrentPage.current = 1
    deliveredCurrentPage.current = 1

    handleGetPendingOrders();
    handleGetDeliveredOrders();
    handleGetProcessingOrders();
    handleGetOccupiedTable();

  }, [showTable])

  return (
    <main className='main'>
      <section className='orders'>
        <div className="chooseOrders">
          <button className={showTable === 'pending' ? 'orderBtn highlightBtn' : 'orderBtn'} onClick={() => setShowTable('pending')}>Pending Orders</button>
          <button className={showTable === 'processing' ? 'orderBtn highlightBtn' : 'orderBtn'} onClick={() => setShowTable('processing')}>Processing Orders</button>
          <button className={showTable === 'delivered' ? 'orderBtn highlightBtn' : 'orderBtn'} onClick={() => setShowTable('delivered')}>Delivered Orders</button>
          <button className={showTable === 'paid' ? 'orderBtn highlightBtn' : 'orderBtn'} onClick={() => setShowTable('paid')}>Mark As Paid</button>
        </div>

        <div className="orderTable">
          {
            showTable === 'delivered' ?
              <OrderTable
                receivedOrder={deliveredOrders}
                changeStatus={handleUpdateDeliveryStatusFalse}
                deliveryLabel='Undo Delivered'
                deliveryIcon={<MdRemoveDone />}
                timestamp={'updatedAt'}
                handlePageClick={handlePageClick}
                pageCount={deliveredPageCount}
              />
              : showTable === 'pending' ?
                <OrderTable
                  receivedOrder={pendingOrders}
                  changeStatus={handleProcessingUpdateStatusTrue}
                  deliveryLabel='Mark Processing'
                  deliveryIcon={<IoMdDoneAll />}
                  timestamp={'createdAt'}
                  handlePageClick={handlePageClick}
                  pageCount={pendingPageCount}
                /> : showTable === 'processing' ?
                <OrderTable
                  receivedOrder={processingOrders}
                  changeStatus={handleDeliveryUpdateStatusTrue}
                  deliveryLabel='Mark Delivered'
                  deliveryIcon={<IoMdDoneAll />}
                  timestamp={'updatedAt'}
                  handlePageClick={handlePageClick}
                  pageCount={processingPageCount}
                /> : 
                <OrderTable
                  receivedOrder={occupiedTable}
                  changeStatus={handleMarkOrderAsPaid}
                  deliveryLabel='Mark As Paid'
                  deliveryIcon={<IoMdDoneAll />}
                  timestamp={'updatedAt'}
                  handlePageClick={handlePageClick}
                  pageCount={occupiedPageCount}
                /> 
                
          }

        </div>
      </section>
    </main>
  );
};

export default Orders;

