
import React, { useState } from 'react';
import { UploadCloud, FileText, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const PrescriptionUploadStep = ({ onPrescriptionUploaded, existingPrescriptions = [] }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [useExisting, setUseExisting] = useState(null); // Store ID of existing prescription
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: "File too large", description: "Please upload a file smaller than 5MB.", variant: "destructive" });
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        toast({ title: "Invalid file type", description: "Please upload a JPG, PNG, or PDF file.", variant: "destructive" });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUseExisting(null); // Clear existing selection if new file is chosen
      onPrescriptionUploaded(file); // Notify parent immediately
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (document.getElementById('prescriptionOrderFile')) {
      document.getElementById('prescriptionOrderFile').value = '';
    }
    onPrescriptionUploaded(null); // Notify parent
  };
  
  const handleSelectExisting = (prescription) => {
    setUseExisting(prescription);
    setSelectedFile(null); // Clear new file selection
    setPreviewUrl(null);
    // Simulate attaching existing prescription file
    onPrescriptionUploaded({ name: prescription.fileName, existingId: prescription.id }); // Notify parent
    toast({ title: "Prescription Selected", description: `${prescription.fileName} will be used for this order.`});
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <UploadCloud size={20} className="text-primary mr-2" />
        <h2 className="text-xl font-bold">Upload Prescription</h2>
      </div>
      <p className="text-gray-600 mb-4">
        Some items in your cart require a prescription. Please upload a new one or select an existing prescription.
      </p>

      { existingPrescriptions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Use an Existing Prescription:</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto border p-3 rounded-md">
            {existingPrescriptions.map(p => (
              <Button
                key={p.id}
                variant={useExisting?.id === p.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleSelectExisting(p)}
              >
                {useExisting?.id === p.id && <CheckCircle size={16} className="mr-2 text-green-500" />}
                <FileText size={16} className="mr-2"/> {p.fileName} - Uploaded on {new Date(p.date).toLocaleDateString()}
              </Button>
            ))}
          </div>
        </div>
      )}

       {(existingPrescriptions.length > 0 || selectedFile) && <p className="text-center my-4 font-medium">OR</p>}


      <div>
        <Label htmlFor="prescriptionOrderFile" className="block text-sm font-medium text-gray-700 mb-1">
          Upload a New Prescription:
        </Label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {previewUrl ? (
              <div className="relative group">
                {selectedFile.type.startsWith('image/') ? (
                  <img  alt="Prescription preview" className="mx-auto h-24 w-auto rounded-md object-contain" src="https://images.unsplash.com/photo-1559574326-b28980940fae" />
                ) : (
                  <FileText className="mx-auto h-24 w-24 text-gray-400" />
                )}
                <div 
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleRemoveFile}
                >
                  <Trash2 size={14} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{selectedFile.name}</p>
              </div>
            ) : (
              <>
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="prescriptionOrderFile"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <Input id="prescriptionOrderFile" name="prescriptionOrderFile" type="file" className="sr-only" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
              </>
            )}
          </div>
        </div>
      </div>
      { (selectedFile || useExisting) && 
        <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md flex items-center">
            <CheckCircle size={20} className="mr-2 flex-shrink-0"/>
            <p className="text-sm">
              {selectedFile ? `${selectedFile.name} is ready to be attached.` : `${useExisting.fileName} selected.`}
            </p>
        </div>
      }
    </div>
  );
};

export default PrescriptionUploadStep;
