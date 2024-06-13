import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import OrderTable from '../../components/Admin/OrderTable';
import '../../Styles/Admin/AdminPages.css'
import { IoMdDoneAll } from "react-icons/io";
import { MdRemoveDone } from "react-icons/md";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {

  const [allOrders, setAllOrders] = useState({
    pending: [],
    processing: [],
    sentToDelivery: [],
    delivered: [],
    unoccupy: [], //occupiedTable

  })
  const [showTable, setShowTable] = useState('pending');

  const [pageLimit, setPageLimit] = useState(5);

  const [pageCount, setPageCount] = useState({
    pending: 1,
    sentToDelivery: 1,
    delivered: 1,
    processing: 1,
    unoccupy: 1, //occupiedPageCount
  });

  const currentPage = useRef(1);


  const handlePageClick = (e) => {
    try {
      console.log(e.selected + 1);
      currentPage.current = e.selected + 1

      handleGetAllOrders(showTable)

    } catch (error) {
      console.log('handlePageClick : ', error);
    }
  }


  // -------------------- Utility function to get all orders ----------------------
  const handleGetAllOrders = async (type) => { // here the type refers to the order type and page count type
    try {

      const response = await axios.get(`https://personal-scan-the-menu.onrender.com/api/v1/orders/${type === 'unoccupy' ? 'paid' : type}?page=${currentPage.current}&limit=${pageLimit}`);
      const data = response.data;

      setPageCount(prevCount => ({ ...prevCount, [type]: data?.result.pageCount }))
      setAllOrders(prevOrders => ({ ...prevOrders, [type]: data?.result.paginatedResult }))

      console.log(`${type} order data`, data);

    } catch (error) {
      console.log(`Unable to get ${type} orders : `, error);
    }
  }

  // To Get Pending Orders
  // const handleGetPendingOrders = async () => {
  //   try {
  //     const response = await axios.get(`https://personal-scan-the-menu.onrender.com/api/v1/orders/pending?page=${currentPage.current}&limit=${pageLimit}`);
  //     const data = response.data;

  //     setPageCount(prevCount => ({ ...prevCount, pending: data?.result.pageCount }))
  //     setAllOrders(prevOrders => ({ ...prevOrders, pending: data?.result.paginatedResult }))

  //     console.log('pend pag res', data);
  //   } catch (error) {
  //     console.log('Unable to get Pending orders : ', error);
  //   }
  // };




  // ------------------- Utility function to Update Status -----------------------------
  const handleUpdateOrderStatus = async (id, orderStatus) => {
    try {
      const response = await axios.put(`https://personal-scan-the-menu.onrender.com/api/v1/orders/${orderStatus}/${id}`);
      const data = response.data;

      toast.success(data.message, {
        autoClose: 1500
      })

      console.log('Updated Data : ', data);
      if (response.status === 200) {
        handleGetAllOrders(showTable);
        ['pending', 'processing', 'sentToDelivery', 'delivered', 'unoccupy'].forEach(handleGetAllOrders);
      }
    } catch (error) {
      console.log(`Unable to set status true of ${orderStatus} or order not found: `, error);
    }
  }

  // To Update Processing status True
  const handleProcessingUpdateStatusTrue = (id) => handleUpdateOrderStatus(id, 'processing');

  // To Update Sent To Delivery Status true
  const handleSentToDeliveryUpdateStatusTrue = (id) => handleUpdateOrderStatus(id, 'sentToDelivery');

  // To Update Delivery Status true
  const handleDeliveryUpdateStatusTrue = (id) => handleUpdateOrderStatus(id, 'delivered');

  // To Update delivery status false
  const handleUpdateDeliveryStatusFalse = async (id) => handleUpdateOrderStatus(id, 'undoDelivered');

  // To Mark Order as paid 
  const handleUnoccupyTable = async (id) => handleUpdateOrderStatus(id, 'markPaid');

  const tableDetails = [
    {
      tableName: 'pending',
      receivedOrder: allOrders.pending,
      changeStatus: handleProcessingUpdateStatusTrue,
      deliveryLabel: 'Mark Processing',
      deliveryIcon: < IoMdDoneAll />,
      timestamp: 'createdAt',
      handlePageClick: handlePageClick,
      pageCount: pageCount.pending,
    },
    {
      tableName: "delivered",
      receivedOrder: allOrders.delivered,
      changeStatus: handleUpdateDeliveryStatusFalse,
      deliveryLabel: 'Undo Delivered',
      deliveryIcon: <MdRemoveDone />,
      timestamp: 'updatedAt',
      handlePageClick: handlePageClick,
      pageCount: pageCount.delivered,
    },
    {
      tableName: 'processing',
      receivedOrder: allOrders.processing,
      changeStatus: handleSentToDeliveryUpdateStatusTrue,
      deliveryLabel: 'Sent To Delivery',
      deliveryIcon: <IoMdDoneAll />,
      timestamp: 'updatedAt',
      handlePageClick: handlePageClick,
      pageCount: pageCount.processing,
    },
    {
      tableName: 'sentToDelivery',
      receivedOrder: allOrders.sentToDelivery,
      changeStatus: handleDeliveryUpdateStatusTrue,
      deliveryLabel: 'Mark Delivered',
      deliveryIcon: <IoMdDoneAll />,
      timestamp: 'updatedAt',
      handlePageClick: handlePageClick,
      pageCount: pageCount.sentToDelivery,
    },
    {
      tableName: 'unoccupy',
      receivedOrder: allOrders.unoccupy,
      changeStatus: handleUnoccupyTable,
      deliveryLabel: 'Unoccupy Table',
      deliveryIcon: <IoMdDoneAll />,
      timestamp: 'updatedAt',
      handlePageClick: handlePageClick,
      pageCount: pageCount.unoccupy,
    }

  ]

  useEffect(() => {

    currentPage.current = 1
    handleGetAllOrders(showTable)

  }, [showTable])


  return (
    <main className='main'>
      <section className='orders'>
        <div className="chooseOrders">
          {
            ['pending', 'processing', 'sentToDelivery', 'delivered', 'unoccupy'].map((currTable, index) => {
              return (
                <button className={showTable === currTable ? 'orderBtn highlightBtn' : 'orderBtn'} onClick={() => setShowTable(currTable)} key={index}>{currTable.toUpperCase()} Orders</button>
              )
            })
          }
        </div>

        <div className="orderTable">
          {
            tableDetails.map((currTable, index) => {
              const { tableName, receivedOrder, changeStatus, deliveryLabel, deliveryIcon, timestamp, handlePageClick, pageCount } = currTable;
              return (
                showTable === tableName &&
                <OrderTable
                  receivedOrder={receivedOrder}
                  changeStatus={changeStatus}
                  deliveryLabel={deliveryLabel}
                  deliveryIcon={deliveryIcon}
                  timestamp={timestamp}
                  handlePageClick={handlePageClick}
                  pageCount={pageCount}
                  key={index}
                />
              )
            })
          }

        </div>

      </section>
    </main>
  );
};

export default Orders;