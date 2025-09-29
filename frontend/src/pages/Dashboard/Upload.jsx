import React, { useState } from 'react'
import { Upload, Database, Image, Calendar, CheckCircle, ChevronRight, X } from "lucide-react";
import Button from '../../components/Button';

export default function UploadFile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadTypes, setUploadTypes] = useState({
    datasets: false,
    media: false
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, idx) => idx !== index));
  };

  const handleSubmit = () => {
    const newFiles = selectedFiles.map(file => ({
      name: file.name,
      date: selectedDate,
      type: file.type.includes('image') || file.name.match(/\.(pdf|png|jpg|jpeg)$/i) ? 'media' : 'dataset'
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setShowPopup(true);

    // Reset form
    setTimeout(() => {
      setShowPopup(false);
      setCurrentStep(1);
      setUploadTypes({ datasets: false, media: false });
      setSelectedDate('');
      setSelectedFiles([]);
    }, 2500);
  };

  const getAcceptedFormats = () => {
    let formats = [];
    if (uploadTypes.datasets) formats.push('.csv', '.json', '.xlsx', '.xls');
    if (uploadTypes.media) formats.push('.pdf', '.png', '.jpg', '.jpeg', '.svg');
    return formats.join(',');
  };

  const getFormatText = () => {
    let text = [];
    if (uploadTypes.datasets) text.push('CSV, JSON, Excel');
    if (uploadTypes.media) text.push('PDF, PNG, JPG, SVG');
    return text.join(' | ') || 'Please select upload type';
  };

  const getSeason = (dateStr) => {
    if (!dateStr) return "";
    const month = new Date(dateStr).getMonth() + 1; // 1-12
    if (month >= 3 && month <= 5) return "Pre-Monsoon";
    if (month >= 6 && month <= 9) return "Monsoon";
    return "Post-Monsoon";
  };

  const canProceedToStep2 = (uploadTypes.datasets || uploadTypes.media) && selectedDate;
  const canSubmit = selectedFiles.length > 0;

  return (
    <div className="space-y-6">
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-scale">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful!</h3>
              <p className="text-gray-600 mb-4">
                {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} uploaded successfully
              </p>
              <p className="text-blue-600 text-sm">Redirecting...</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <Upload className="mr-3 text-blue-600" size={28} />
          Upload & Edit Data
        </h2>
        <p className="text-blue-700 mb-6">Upload new groundwater samples and update existing datasets</p>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
              {currentStep > 1 ? <CheckCircle size={28} /> : '1'}
            </div>
            <span className={`font-semibold ${currentStep >= 1 ? 'text-blue-900' : 'text-gray-500'}`}>
              Configure Upload
            </span>
          </div>

          <ChevronRight className="text-gray-400" size={28} />

          <div className="flex items-center gap-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
              2
            </div>
            <span className={`font-semibold ${currentStep >= 2 ? 'text-blue-900' : 'text-gray-500'}`}>
              Select Files
            </span>
          </div>
        </div>

        {/* Step 1: Configure Upload (Type + Date) */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Upload Type Selection */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                Select Upload Type
              </h3>
              <p className="text-blue-700 mb-4">Choose what type of data you want to upload</p>
              <div className="gap-10 grid grid-cols-2">
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={uploadTypes.datasets}
                    onChange={(e) => setUploadTypes({ ...uploadTypes, datasets: e.target.checked })}
                    className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <Database size={24} className="text-blue-600" />
                  <div className="flex-1">
                    <span className="text-blue-900 font-semibold block">Datasets</span>
                    <span className="text-blue-600 text-sm">JSON, CSV, Excel files</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={uploadTypes.media}
                    onChange={(e) => setUploadTypes({ ...uploadTypes, media: e.target.checked })}
                    className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <Image size={24} className="text-green-600" />
                  <div className="flex-1">
                    <span className="text-blue-900 font-semibold block">Graphs/IoT Data</span>
                    <span className="text-blue-600 text-sm">PDF, PNG, JPG, SVG files</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Choose Date
              </h3>
              <p className="text-blue-700 mb-4">Select the date for your upload</p>
              <div className="grid grid-cols-2 gap-6">
                {/* Date Picker */}
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-blue-300">
                  <Calendar size={24} className="text-blue-600" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="flex-1 px-3 py-2 border-0 focus:outline-none focus:ring-0 text-blue-900 font-medium"
                  />
                </div>

                {/* Season Display */}
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-blue-300">
                  {selectedDate ? (
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle size={18} className="text-green-600" />
                      <span className="text-gray-800">
                        {new Date(selectedDate).toLocaleDateString()}
                      </span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getSeason(selectedDate) === "Pre-Monsoon"
                            ? "bg-green-100 text-green-700"
                            : getSeason(selectedDate) === "Monsoon"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                      >
                        {getSeason(selectedDate)}
                      </span>
                    </p>
                  ) : (
                    <span className="text-gray-500 italic">No date selected</span>
                  )}
                </div>
              </div>

            </div>
            <Button func={() => canProceedToStep2 && setCurrentStep(2)} disabled={!canProceedToStep2} text="Continue to File Selection →"/>
          </div>
        )}

        {/* Step 2: Select and Upload Files */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">Select Files to Upload</h3>
              <div className="bg-white p-3 rounded-lg mb-4 border border-blue-200">
                <p className="text-sm text-black">
                  <strong>Upload Type:</strong> {getFormatText()}
                </p>
                <p className="text-sm text-black">
                  <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}
                </p>
              </div>

              <label className="border-5 border-dashed border-blue-300 rounded-xl p-12 text-center bg-white hover:border-blue-500 transition cursor-pointer block">
                <input
                  type="file"
                  multiple
                  accept={getAcceptedFormats()}
                  onChange={handleFileSelection}
                  className="hidden"
                />
                <Upload size={64} className="text-blue-400 mx-auto mb-4" />
                <p className="text-blue-900 font-semibold mb-2">Drop files here or click to browse</p>
                <p className="text-blue-600 text-sm">{getFormatText()}</p>
              </label>

              {/* Selected Files List */}
              {selectedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Selected Files ({selectedFiles.length})</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedFiles.map((file, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg flex justify-between items-center border border-blue-200">
                        <div className="flex items-center gap-2">
                          {file.type.includes('image') || file.name.match(/\.(pdf|png|jpg|jpeg)$/i) ? (
                            <Image size={18} className="text-green-600" />
                          ) : (
                            <Database size={18} className="text-blue-600" />
                          )}
                          <span className="text-blue-900 font-medium text-sm">{file.name}</span>
                        </div>
                        <button
                          onClick={() => removeFile(idx)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center  justify-between ">
              <Button func={() => setCurrentStep(1)} text="← Back"/>
              
              <Button text="Submit Upload ✓" disabled={!canSubmit} func={handleSubmit}/>
            </div>
          </div>
        )}

        {/* Recent Uploads - Always visible */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-4">Recent Uploads</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {file.type === 'dataset' ? (
                      <Database size={18} className="text-blue-600" />
                    ) : (
                      <Image size={18} className="text-green-600" />
                    )}
                    <span className="text-blue-900 font-medium">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 text-sm">{file.date}</span>
                    <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> Uploaded
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale {
          animation: scale 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}