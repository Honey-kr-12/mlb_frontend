import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../context/ProductContext';
import { Space, Table, Tag } from 'antd';

function Products() {
    const { orders, setOrders, fetchOrders } = useProductContext();
console.log(orders);

    useEffect(() => {
      fetchOrders(); 
    }, []);
  
    
  const columns = [
    {
      title: 'Claim ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Purchaser Name',
      dataIndex: 'purchaserName',
      key: 'purchaserName',
    },
    {
      title: 'Goods/Services Name',
      dataIndex: 'goodsServicesName',
      key: 'goodsServicesName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount.toLocaleString()}`,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      render: (amountPaid) => `₹${amountPaid.toLocaleString()}`,
    },
    {
      title: 'Amount Pending',
      dataIndex: 'amountPending',
      key: 'amountPending',
      render: (amountPending) => `₹${amountPending.toLocaleString()}`,
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      key: 'gst',
      render: (gst) => `₹${gst.toLocaleString()}`,
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
      title: 'Goods/Services Date',
      dataIndex: 'goodServicesDate',
      key: 'goodServicesDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Reported Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];
  const lost_damage_Order = orders?.data
    return (
      <div style={{ padding: '20px' }}>
        <Table
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={lost_damage_Order}
            className="centered-table"
            rowKey="_id"
            scroll={{ x:1050,y: 400 }}
            pagination={{
              showSizeChanger: true,
            }}
            style={{ width: '100%', height: '505px' }}
          />
      </div>
    );
}

export default Products