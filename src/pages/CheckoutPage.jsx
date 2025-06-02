import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePrescription } from '@/contexts/PrescriptionContext';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentDetails from '@/components/checkout/PaymentDetails';
import OrderSummary from '@/components/checkout/OrderSummary';
import PrescriptionUploadStep from '@/components/checkout/PrescriptionUploadStep';
import { Button } from '@/components/ui/button';
import { products as allProducts } from '@/data/products'; // Assuming this is where product data is stored

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { prescriptions, addPrescription } = usePrescription();
  const { toast } = useToast();
  const navigate = useNavigate();

  const initialFormData = {
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    zipCode: '560001',
    country: 'IN',
    paymentMethod: 'card', // 'card', 'cod', 'upi'
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Prescription (if needed), 3: Payment
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const [uploadedPrescriptionForOrder, setUploadedPrescriptionForOrder] = useState(null);

  useEffect(() => {
    const itemsRequiringPrescription = cartItems.some(item => {
      const productDetails = allProducts.find(p => p.id === item.id);
      return productDetails?.prescriptionNeeded;
    });
    setRequiresPrescription(itemsRequiringPrescription);
  }, [cartItems]);

  useEffect(() => {
    if (!user && currentStep > 1) {
      toast({
        title: "Login Required",
        description: "Please log in to continue checkout.",
        variant: "destructive"
      });
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  }, [user, currentStep, navigate, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handlePrescriptionUploaded = (file) => {
    setUploadedPrescriptionForOrder(file);
    // Optionally add to global prescriptions context here if needed immediately
    // addPrescription({ file, fileName: file.name, notes: 'Order-specific prescription', date: new Date().toISOString() });
    toast({ title: "Prescription Attached", description: "Your prescription is attached to this order." });
  };

  const nextStep = () => {
    if (currentStep === 1 && requiresPrescription) {
      setCurrentStep(2);
    } else if (currentStep === 1 && !requiresPrescription) {
      setCurrentStep(3);
    } else if (currentStep === 2) {
      if (requiresPrescription && !uploadedPrescriptionForOrder && !prescriptions.length) { // Simplified check: must upload if no general ones exist
         toast({ title: "Prescription Required", description: "Please upload a prescription for your medication(s).", variant: "destructive" });
         return;
      }
      setCurrentStep(3);
    }
  };

  const prevStep = () => setCurrentStep(s => s - 1);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (currentStep !== 3) return; // Only submit on the last step

    if (requiresPrescription && !uploadedPrescriptionForOrder && !prescriptions.length) {
        toast({ title: "Prescription Required", description: "A prescription is needed for one or more items in your cart.", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. Your order is being processed.",
      duration: 5000,
    });

    if (uploadedPrescriptionForOrder) {
        // Add the order-specific prescription to global state now that order is confirmed
        addPrescription({
          file: uploadedPrescriptionForOrder,
          fileName: uploadedPrescriptionForOrder.name,
          notes: `For order placed on ${new Date().toLocaleDateString()}`, // Example note
          date: new Date().toISOString(),
        });
    }

    clearCart();
    navigate('/order-confirmation', { 
      state: { 
        orderDetails: {
          items: cartItems,
          total: totalAmount,
          paymentMethod: formData.paymentMethod
        }
      }
    });
    setIsSubmitting(false);
  };

  if (cartItems.length === 0 && !isSubmitting) { // Prevent navigation if submitting
    navigate('/cart');
    return null;
  }

  const shippingCost = 50.00; 
  const taxRate = 0.18; 
  const subtotal = getCartTotal();
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm 
            formData={formData} 
            handleChange={handleChange} 
            handleSelectChange={handleSelectChange} 
          />
        );
      case 2:
        return (
          <PrescriptionUploadStep 
            onPrescriptionUploaded={handlePrescriptionUploaded}
            existingPrescriptions={prescriptions}
          />
        );
      case 3:
        return (
          <PaymentDetails
            formData={formData}
            handleChange={handleChange}
            paymentMethod={formData.paymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600 mb-6">
          Step {currentStep} of {requiresPrescription ? 3 : 2}: 
          {currentStep === 1 && " Shipping Information"}
          {currentStep === 2 && requiresPrescription && " Upload Prescription"}
          {currentStep === (requiresPrescription ? 3 : 2) && " Payment Details"}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmitOrder}>
              {renderStepContent()}

              <div className="mt-8 flex justify-between items-center">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                    Back
                  </Button>
                )}
                {currentStep < (requiresPrescription ? 3 : 2) ? (
                  <Button type="button" onClick={nextStep} disabled={isSubmitting} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full lg:w-auto ml-auto" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Place Order (₹${totalAmount.toFixed(2)})`}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:w-1/3">
            <OrderSummary 
              cartItems={cartItems} 
              subtotal={subtotal}
              shippingCost={shippingCost}
              taxAmount={taxAmount}
              totalAmount={totalAmount}
              requiresPrescription={requiresPrescription}
              hasPrescription={!!uploadedPrescriptionForOrder || prescriptions.length > 0}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;