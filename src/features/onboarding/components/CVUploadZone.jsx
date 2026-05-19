import { UploadCloud, File, X, CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { useCVUploadZone } from '../hooks/useCVUploadZone';

const CVUploadZone = ({ cvFile, setCvFile }) => {
  const {
    fileInputRef,
    isDragging,
    uploadProgress,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeFile
  } = useCVUploadZone(cvFile, setCvFile);

  return (
    <div className="w-full">
      {!cvFile && uploadProgress === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-colors duration-200 bg-white
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border/80 hover:border-primary/50 hover:bg-bg-secondary/30'}
          `}
        >
          <div className="w-16 h-16 rounded-full bg-accent-purple-light flex items-center justify-center text-primary mb-6">
            <UploadCloud size={32} />
          </div>
          
          <h3 className="text-[22px] font-bold text-primary-text mb-2">
            Drag & Drop your CV here
          </h3>
          <p className="text-secondary-text mb-8">
            Supported formats: PDF, DOCX (Max 5MB)
          </p>
          
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-2.5 font-medium border-border"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose File
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
        </div>
      ) : (
        <div className="border border-border rounded-2xl p-6 bg-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center text-primary shrink-0">
            <File size={24} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-primary-text truncate pr-4">
                {cvFile ? cvFile.name : 'Uploading...'}
              </h4>
              {uploadProgress < 100 ? (
                <span className="text-sm font-medium text-primary shrink-0">{uploadProgress}%</span>
              ) : (
                <button onClick={removeFile} className="text-secondary-text hover:text-error transition-colors shrink-0">
                  <X size={20} />
                </button>
              )}
            </div>
            
            {uploadProgress < 100 ? (
              <div className="w-full bg-border rounded-full h-1.5 mt-2">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-sm font-medium text-success mt-1">
                <CheckCircle size={16} />
                <span>Upload complete</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVUploadZone;
