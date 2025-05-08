
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Truck, AlertTriangle } from 'lucide-react';

const OrderSummary = ({ cartItems, subtotal, shippingCost, taxAmount, totalAmount, requiresPrescription, hasPrescription }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-50 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                <img  alt={item.name} className="h-8 w-8 object-contain" src="https://images.unsplash.com/photo-1696861286643-341a8d7a79e9" />
              </div>
              <div className="flex-grow">
                <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>₹{shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (18%)</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>

      {requiresPrescription && !hasPrescription && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-md flex items-center">
            <AlertTriangle size={20} className="mr-2 flex-shrink-0"/>
            <p className="text-sm">A prescription is required for one or more items in your cart.</p>
        </div>
      )}
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Truck size={16} className="text-primary mr-2" />
          <span className="text-sm font-medium">Estimated Delivery</span>
        </div>
        <p className="text-sm text-gray-600">
          {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - 
          {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
