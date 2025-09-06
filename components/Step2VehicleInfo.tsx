
import React, { useState } from 'react';
import type { VehicleData, AssessmentData } from '../types';
import VINScanner from './VINScanner';

interface Props {
  data: VehicleData;
  updateData: (data: Partial<AssessmentData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2VehicleInfo: React.FC<Props> = ({ data, updateData, nextStep, prevStep }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVinScanned = (vin: string, details: { year: string, make: string, model: string }) => {
    setFormData({
      vin,
      year: details.year,
      make: details.make,
      model: details.model,
    });
  };

  const handleNext = () => {
    updateData({ vehicle: formData });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Vehicle Information</h2>
      <p className="text-gray-500 mb-6">Tell us about your vehicle. Use our scanner for a quick start!</p>
      
      <VINScanner onScanSuccess={handleVinScanned} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="text"
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="2022"
          />
        </div>
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
          <input
            type="text"
            name="make"
            id="make"
            value={formData.make}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Toyota"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            id="model"
            value={formData.model}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Camry"
          />
        </div>
      </div>
      <div className="mt-4">
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN</label>
          <input
            type="text"
            name="vin"
            id="vin"
            value={formData.vin}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="1G... or Scan Above"
          />
        </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          &larr; Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Next: Condition &rarr;
        </button>
      </div>
    </div>
  );
};

export default Step2VehicleInfo;
