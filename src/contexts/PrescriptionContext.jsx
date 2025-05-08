
import React, { createContext, useContext, useState, useEffect } from 'react';

const PrescriptionContext = createContext();

export const usePrescription = () => useContext(PrescriptionContext);

export const PrescriptionProvider = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPrescriptions = localStorage.getItem('prescriptions');
    if (savedPrescriptions) {
      try {
        setPrescriptions(JSON.parse(savedPrescriptions));
      } catch (error) {
        console.error('Error parsing prescriptions data:', error);
        setPrescriptions([]);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    }
  }, [prescriptions, isLoading]);

  const addPrescription = (prescription) => {
    setPrescriptions(prevPrescriptions => [
      ...prevPrescriptions,
      { ...prescription, id: Date.now().toString() } // Simple ID generation
    ]);
  };

  const removePrescription = (prescriptionId) => {
    setPrescriptions(prevPrescriptions => 
      prevPrescriptions.filter(p => p.id !== prescriptionId)
    );
  };

  return (
    <PrescriptionContext.Provider value={{
      prescriptions,
      addPrescription,
      removePrescription,
      isLoading
    }}>
      {children}
    </PrescriptionContext.Provider>
  );
};
