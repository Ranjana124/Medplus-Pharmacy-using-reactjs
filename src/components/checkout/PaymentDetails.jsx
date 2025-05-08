
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, ShieldCheck, Landmark, Smartphone } from 'lucide-react';

const PaymentDetails = ({ formData, handleChange, paymentMethod, onPaymentMethodChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <CreditCard size={20} className="text-primary mr-2" />
        <h2 className="text-xl font-bold">Payment Details</h2>
      </div>

      <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Label
            htmlFor="payment-card"
            className={`flex flex-1 items-center space-x-3 rounded-md border-2 p-4 transition-all hover:border-primary ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
          >
            <RadioGroupItem value="card" id="payment-card" />
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="font-medium">Credit/Debit Card</span>
          </Label>
          <Label
            htmlFor="payment-upi"
            className={`flex flex-1 items-center space-x-3 rounded-md border-2 p-4 transition-all hover:border-primary ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
          >
            <RadioGroupItem value="upi" id="payment-upi" />
            <Smartphone className="h-5 w-5 text-primary" />
            <span className="font-medium">UPI</span>
          </Label>
          <Label
            htmlFor="payment-cod"
            className={`flex flex-1 items-center space-x-3 rounded-md border-2 p-4 transition-all hover:border-primary ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
          >
            <RadioGroupItem value="cod" id="payment-cod" />
            <Landmark className="h-5 w-5 text-primary" />
            <span className="font-medium">Cash on Delivery</span>
          </Label>
        </div>
      </RadioGroup>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardName">Name on Card</Label>
            <Input id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required={paymentMethod === 'card'} />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} required={paymentMethod === 'card'} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required={paymentMethod === 'card'} />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" name="cvv" type="password" placeholder="123" value={formData.cvv} onChange={handleChange} required={paymentMethod === 'card'} />
            </div>
          </div>
          <div className="mt-4 flex items-start">
            <ShieldCheck size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-600">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div>
          <Label htmlFor="upiId">UPI ID</Label>
          <Input id="upiId" name="upiId" placeholder="yourname@okbank" value={formData.upiId} onChange={handleChange} required={paymentMethod === 'upi'} />
          <p className="text-xs text-gray-500 mt-1">You will receive a payment request on your UPI app.</p>
        </div>
      )}

      {paymentMethod === 'cod' && (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md">
          <p className="font-medium">Cash on Delivery Selected</p>
          <p className="text-sm">Please keep the exact amount ready at the time of delivery.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
