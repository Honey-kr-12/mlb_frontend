import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Popover, Select, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';
// import useLogout from '../../hooks/useLogout';
import './header.css';
// import { useOrderContext } from '../../context/OrderContext';

const { Search } = Input;

const Header = ({ darktheme }) => {
//   const { authUser, balance } = useAuthContext();
//   const { loading, logout } = useLogout();
  const navigate = useNavigate();
//console.log(balance);

  const options = [
    {
      value: 'shipment',
      label: 'Shipment',
    },
    {
      value: 'orderId',
      label: 'OrderId',
    },
  ];

//   const {orders} = useOrderContext();
// const amount = parseFloat(authUser?.amount?.toFixed(2))

  return (
    <div className={darktheme ? 'darkHeader' : 'main-header'}>
      <div className="header-container" >
        <Button onClick={() => navigate('/productvoice')}>Click</Button>
        <span className='span'></span>
        <Button className={`${100 >= 0 ? 'money' : 'insuffient'}`} type="default">&#8377;  {100.0909?.toFixed(2)}</Button>
        <span className='span'></span>
        <Button className={`${100 >= 0 ? 'money' : 'insuffient'}`} type="default">&#8377;  {100.0909?.toFixed(2)}</Button>
      </div>
    </div>
  );
};

export default Header;
