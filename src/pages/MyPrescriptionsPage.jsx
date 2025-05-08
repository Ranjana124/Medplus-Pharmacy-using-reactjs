
import React from 'react';
import { motion } from 'framer-motion';
import { usePrescription } from '@/contexts/PrescriptionContext';
import { ScrollText, UploadCloud, Trash2, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const MyPrescriptionsPage = () => {
  const { prescriptions, removePrescription, isLoading } = usePrescription();
  const { toast } = useToast();

  const handleRemovePrescription = (prescriptionId, fileName) => {
    removePrescription(prescriptionId);
    toast({
      title: "Prescription Removed",
      description: `${fileName} has been removed.`,
      variant: "destructive"
    });
  };

  const handleDownloadPrescription = (prescription) => {
    // This is a mock download. In a real app, file would be served from a URL.
    if (prescription.file instanceof File) {
      const url = URL.createObjectURL(prescription.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = prescription.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
       toast({
        title: "Download Started",
        description: `Downloading ${prescription.fileName}.`,
      });
    } else {
       toast({
        title: "Download Failed",
        description: `Could not download ${prescription.fileName}. File data may not be available.`,
        variant: "destructive"
      });
    }
  };


  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ScrollText className="mx-auto h-16 w-16 text-primary animate-pulse mb-4" />
        <p className="text-lg text-gray-600">Loading prescriptions...</p>
      </div>
    );
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <ScrollText className="w-10 h-10 text-primary mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">My Prescriptions</h1>
          </div>
          <Link to="/upload-prescription">
            <Button className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-white">
              <UploadCloud size={18} className="mr-2" /> Upload New Prescription
            </Button>
          </Link>
        </div>

        {prescriptions.length === 0 ? (
          <div className="text-center py-16">
            <ScrollText size={64} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Prescriptions Uploaded</h3>
            <p className="text-gray-500 mb-6">Upload your prescriptions to easily order medications.</p>
          </div>
        ) : (
          <div className="space-y-6">
             <motion.ul layout className="space-y-4">
              {prescriptions.map((prescription) => (
                <motion.li
                  key={prescription.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3 sm:mb-0 flex-grow">
                    <FileText size={32} className="text-primary mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-md font-semibold text-gray-800 truncate max-w-xs">{prescription.fileName}</p>
                      <p className="text-xs text-gray-500">Uploaded: {new Date(prescription.date).toLocaleDateString()}</p>
                      {prescription.notes && <p className="text-xs text-gray-500 mt-1">Notes: <span className="italic">{prescription.notes}</span></p>}
                    </div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownloadPrescription(prescription)}
                        disabled={!prescription.file} // Disable if no file object (e.g., older data)
                    >
                      <Download size={16} className="mr-1.5" /> Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100"
                      onClick={() => handleRemovePrescription(prescription.id, prescription.fileName)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyPrescriptionsPage;
