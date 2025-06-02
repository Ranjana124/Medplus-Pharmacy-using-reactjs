
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { usePrescription } from '@/contexts/PrescriptionContext';

const UploadPrescriptionPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addPrescription } = usePrescription();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or PDF file.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    document.getElementById('prescriptionFile').value = '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a prescription file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addPrescription({
      file: selectedFile,
      fileName: selectedFile.name,
      notes: notes,
      date: new Date().toISOString(),
    });
    
    setIsUploading(false);
    toast({
      title: "Prescription Uploaded",
      description: "Your prescription has been successfully uploaded. We will review it shortly.",
    });
    navigate('/cart'); // Or to a confirmation page / profile prescriptions
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <UploadCloud className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold">Upload Prescription</h1>
          <p className="text-gray-600 mt-2">
            Easily upload your prescription to order medicines. Supports JPG, PNG, PDF (max 5MB).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="prescriptionFile" className="block text-sm font-medium text-gray-700 mb-1">
              Prescription File
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div className="relative group">
                    {selectedFile.type.startsWith('image/') ? (
                      <img alt="Prescription preview" className="mx-auto h-32 w-auto rounded-md object-contain" src={previewUrl} />
                    ) : (
                      <FileText className="mx-auto h-32 w-32 text-gray-400" />
                    )}
                    <div 
                      className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleRemoveFile}
                    >
                      <Trash2 size={16} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{selectedFile.name}</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="prescriptionFile"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                      >
                        <span>Upload a file</span>
                        <Input id="prescriptionFile" name="prescriptionFile" type="file" className="sr-only" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </Label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Any specific instructions or notes for the pharmacist..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Submit Prescription'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadPrescriptionPage;
