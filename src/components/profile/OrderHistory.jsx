import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Package, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchUserOrders = () => {
      try {
        const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        // Filter orders for the current user and remove duplicates
        const uniqueOrders = allOrders.reduce((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          if (!x && current.userId === user?.email) {
            return acc.concat([current]);
          }
          return acc;
        }, []);
        // Sort orders by date, most recent first
        const sortedOrders = uniqueOrders.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };

    fetchUserOrders();
    // Set up an interval to check for new orders every 30 seconds
    const interval = setInterval(fetchUserOrders, 30000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Order History</h2>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex flex-wrap justify-between items-center mb-2">
                <h3 className="font-semibold">Order #{order.id}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Items</p>
                  <p>{order.items.length}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p>₹{order.total.toFixed(2)}</p>
                </div>
                <div className="flex items-end">
                  <Button variant="link" className="h-auto p-0" onClick={() => handleViewDetails(order)}>View Details</Button>
                </div>
              </div>
            </div>
          ))}

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
                
                <h3 className="text-xl font-bold mb-4">Order Details</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                    <div>
                      <p className="text-gray-600">Order ID</p>
                      <p className="font-medium">#{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="py-4 border-b">
                    <h4 className="font-semibold mb-3">Products</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="py-4 border-b">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Payment Method</p>
                      <p className="font-medium">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-600">Payment Status</p>
                      <p className={`font-medium ${selectedOrder.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
                        {selectedOrder.paymentStatus}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold">Total Amount</p>
                      <p className="text-lg font-bold">₹{selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Package size={40} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;