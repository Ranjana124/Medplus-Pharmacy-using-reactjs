
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ShieldCheck } from 'lucide-react';

const PaymentForm = ({ formData, handleChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center mb-4">
        <CreditCard size={20} className="text-primary mr-2" />
        <h2 className="text-xl font-bold">Payment Information</h2>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" name="cvv" type="password" placeholder="123" value={formData.cvv} onChange={handleChange} required />
        </div>
      </div>
      
      <div className="mt-4 flex items-start">
        <ShieldCheck size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
        <p className="text-sm text-gray-600">
          Your payment information is encrypted and secure. We never store your full card details.
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;
