
import React, { useState } from 'react';
import type { ConditionData, AssessmentData } from '../types';
import { SERVICE_PACKAGES, VEHICLE_SIZES, CONDITION_LEVELS, COMMON_ISSUES } from '../constants';

interface Props {
  data: ConditionData;
  updateData: (data: Partial<AssessmentData>) => void;
  handleSubmit: () => void;
  prevStep: () => void;
}

const Step3Condition: React.FC<Props> = ({ data, updateData, handleSubmit, prevStep }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({ servicePackage: '', vehicleSize: ''});

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({...prev, [name]: value}));
  }

  const handleIssueToggle = (issue: string) => {
    setFormData(prev => {
      const newIssues = prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue];
      return { ...prev, issues: newIssues };
    });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { servicePackage: '', vehicleSize: ''};
    if (!formData.servicePackage) {
      newErrors.servicePackage = 'Please select a service package.';
      valid = false;
    }
    if (!formData.vehicleSize) {
      newErrors.vehicleSize = 'Please select your vehicle size.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  const onFinalSubmit = () => {
    if (validate()) {
      updateData({ condition: formData });
      handleSubmit();
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Service & Condition</h2>
      <p className="text-gray-500 mb-6">Finally, select your desired service and tell us about its current state.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Package</label>
          <select 
            name="servicePackage" 
            value={formData.servicePackage} 
            onChange={handleSelectChange}
            className={`block w-full px-3 py-2 border ${errors.servicePackage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="" disabled>Select a package...</option>
            {Object.keys(SERVICE_PACKAGES).map(pkg => <option key={pkg} value={pkg}>{pkg}</option>)}
          </select>
          {errors.servicePackage && <p className="mt-1 text-sm text-red-500">{errors.servicePackage}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Size</label>
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
                {VEHICLE_SIZES.map(size => (
                    <button key={size} onClick={() => handleRadioChange('vehicleSize', size)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${formData.vehicleSize === size ? 'bg-indigo-600 text-white shadow' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}>
                        {size}
                    </button>
                ))}
            </div>
            {errors.vehicleSize && <p className="mt-1 text-sm text-red-500">{errors.vehicleSize}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Condition</label>
            <div className="flex justify-between">
              {CONDITION_LEVELS.map(level => (
                <button key={level} onClick={() => handleRadioChange('exterior', level)} className={`px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm font-medium rounded-full transition-colors w-full mx-1 ${formData.exterior === level ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}>
                    {level}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interior Condition</label>
            <div className="flex justify-between">
            {CONDITION_LEVELS.map(level => (
                <button key={level} onClick={() => handleRadioChange('interior', level)} className={`px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm font-medium rounded-full transition-colors w-full mx-1 ${formData.interior === level ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>
                    {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Any specific issues? (Optional)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMMON_ISSUES.map(issue => (
              <button
                key={issue}
                onClick={() => handleIssueToggle(issue)}
                className={`text-left px-4 py-2 border rounded-md transition-colors flex items-center ${formData.issues.includes(issue) ? 'bg-indigo-100 border-indigo-500 text-indigo-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <div className={`w-4 h-4 rounded-sm border-2 ${formData.issues.includes(issue) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'} mr-2`}></div>
                {issue}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          &larr; Back
        </button>
        <button
          onClick={onFinalSubmit}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors text-lg"
        >
          Generate Estimate
        </button>
      </div>
    </div>
  );
};

export default Step3Condition;
