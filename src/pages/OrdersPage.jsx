
import React from 'react';
import { motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  // Dummy order data - replace with actual data fetching
  const orders = []; // Start with empty orders

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-8"
      >
        <div className="flex items-center mb-8">
          <PackageSearch className="w-10 h-10 text-primary mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <PackageSearch size={64} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-6">You haven't placed any orders with us. Start shopping to see your orders here.</p>
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Order ID: {order.id}</h2>
                    <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">Total Amount: <span className="font-semibold">₹{order.total.toFixed(2)}</span></p>
                <p className="text-sm text-gray-600 mb-4">Items: {order.items.length}</p>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Track Order</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrdersPage;
