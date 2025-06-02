import React, { useState, useEffect } from 'react';
import { IndianRupee } from 'lucide-react';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        // Filter out duplicate orders based on order ID
        const uniqueOrders = storedOrders.filter((order, index, self) =>
          index === self.findIndex((o) => o.id === order.id)
        );
        setOrders(uniqueOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.userName}</td>
                <td className="p-4">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-4">₹{order.total.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm">{order.paymentMethod}</div>
                    <div className={`text-xs ${
                      order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {order.paymentStatus}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;