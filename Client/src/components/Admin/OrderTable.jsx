import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import '../../Styles/Admin/AdminComponent.css'
import axios from 'axios'

const OrderTable = ({ receivedOrder, changeStatus, deliveryLabel, deliveryIcon, timestamp, pageCount, handlePageClick }) => {


  return (
    <div className='orderComponent'>
      <table border={1} className='table'>
        <thead>
          <tr>
            <th>Index</th>
            <th>User</th>
            <th>Dish Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Dish Price</th>
            <th>Total Amount</th>
            <th>Date and Time</th>
            <th>{deliveryLabel}</th>
          </tr>
        </thead>

        <tbody>
          {
            receivedOrder.map((order, index) => (
              <React.Fragment key={index}>
                {
                  order.orderedDish.data.map((dish, innerIndex) => (

                    <tr key={`${index}-${innerIndex}`}>

                      {
                        innerIndex === 0 &&
                        <td rowSpan={order.orderedDish.data.length}>{index + 1}</td>
                      }

                      {
                        innerIndex === 0 &&
                        <td rowSpan={order.orderedDish.data.length}>{order.user}</td>
                      }

                      <td>{dish.dishName}</td>
                      <td>{dish.type}</td>
                      <td>{dish.quantity}</td>
                      <td>{dish.dishPrice}</td>

                      {
                        innerIndex === 0 &&
                        <td rowSpan={order.orderedDish.data.length}>{order.amount}</td>
                      }

                      {
                        innerIndex === 0 &&
                        <td rowSpan={order.orderedDish.data.length}>{new Date(timestamp === 'createdAt' ? order.createdAt : order.updatedAt).toLocaleString()}</td>
                      }

                      {
                        innerIndex === 0 &&
                        <td className='markIcon' rowSpan={order.orderedDish.data.length} onClick={() => changeStatus(order._id)}>{deliveryIcon}</td>
                      }
                    </tr>

                  ))
                }

              </React.Fragment>
            ))
          }
        </tbody>
      </table>

      <ReactPaginate
        className='pagination'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName="active"
      />
    </div>
  )
}

export default OrderTable
