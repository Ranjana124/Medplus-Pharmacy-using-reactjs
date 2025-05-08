
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Payment Methods</h2>
        <Button size="sm">Add Payment Method</Button>
      </div>
      <div className="text-center py-8">
        <CreditCard size={40} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
        <p className="text-gray-500 mb-4">You haven't added any payment methods yet.</p>
      </div>
    </div>
  );
};

export default PaymentMethods;
