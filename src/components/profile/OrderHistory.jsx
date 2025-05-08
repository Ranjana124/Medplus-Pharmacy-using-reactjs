
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const OrderHistory = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Order History</h2>
      
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex flex-wrap justify-between items-center mb-2">
                <h3 className="font-semibold">{order.id}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p>{order.date}</p>
                </div>
                <div>
                  <p className="text-gray-500">Items</p>
                  <p>{order.items}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p>₹{order.total.toFixed(2)}</p>
                </div>
                <div className="flex items-end">
                  <Button variant="link" className="h-auto p-0">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Package size={40} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Button>Start Shopping</Button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
