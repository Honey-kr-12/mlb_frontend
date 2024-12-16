import React from 'react'
import {
    FaShoppingCart,
    FaHourglassHalf,
    FaTimesCircle,
    FaCheckCircle,
  } from "react-icons/fa";

const Tile = () => {
  return (
    <div className="orderSummaryCard">
    <div className="orderSummary">
      <h3>7</h3>
      <p>Completed Orders</p>
      <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
        <strong>Today: </strong>
        9
      </p>
    </div>
    <div className="orderIcon">
      <FaCheckCircle size={40} color="#34A853" />
    </div>
  </div>
  )
}

export default Tile