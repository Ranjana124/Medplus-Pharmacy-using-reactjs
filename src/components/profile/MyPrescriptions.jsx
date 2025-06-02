
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollText, UploadCloud, Trash2, FileText, Download } from 'lucide-react';
import { usePrescription } from '@/contexts/PrescriptionContext';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';


const MyPrescriptions = () => {
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
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 text-center">
        <ScrollText className="mx-auto h-12 w-12 text-primary animate-pulse mb-3" />
        <p className="text-md text-gray-500">Loading your prescriptions...</p>
      </div>
    );
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -15, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-xl p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <ScrollText className="w-7 h-7 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">My Prescriptions</h2>
        </div>
        <Link to="/upload-prescription">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-white">
            <UploadCloud size={18} className="mr-2" /> Upload New
          </Button>
        </Link>
      </div>

      {prescriptions.length === 0 ? (
        <div className="text-center py-10">
          <ScrollText size={48} className="mx-auto text-gray-300 mb-5" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Prescriptions Yet</h3>
          <p className="text-gray-500">You haven't uploaded any prescriptions.</p>
        </div>
      ) : (
        <motion.ul layout className="space-y-4">
          <AnimatePresence>
            {prescriptions.map((prescription) => (
              <motion.li
                key={prescription.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-3.5 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2 sm:mb-0 flex-grow min-w-0">
                  <FileText size={28} className="text-primary mr-3.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate" title={prescription.fileName}>{prescription.fileName}</p>
                    <p className="text-xs text-gray-500">Uploaded: {new Date(prescription.date).toLocaleDateString()}</p>
                    {prescription.notes && <p className="text-xs text-gray-500 mt-0.5 truncate" title={prescription.notes}>Notes: <span className="italic">{prescription.notes}</span></p>}
                  </div>
                </div>
                <div className="flex space-x-2 flex-shrink-0 mt-2 sm:mt-0">
                  <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDownloadPrescription(prescription)}
                      disabled={!prescription.file}
                  >
                    <Download size={14} className="mr-1" /> 
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-100 h-8 w-8"
                    onClick={() => handleRemovePrescription(prescription.id, prescription.fileName)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </motion.div>
  );
};

export default MyPrescriptions;
