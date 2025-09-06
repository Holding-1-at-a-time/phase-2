
import React from 'react';
import type { EstimateResult } from '../types';

interface Props {
  estimate: EstimateResult;
  onReset: () => void;
}

const Step4Estimate: React.FC<Props> = ({ estimate, onReset }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Estimate is Ready!</h2>
      <p className="text-gray-500 mb-8">This is a preliminary estimate based on your self-assessment.</p>
      
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 mb-8 max-w-md mx-auto">
        <div className="text-sm text-indigo-700 uppercase tracking-wider">Estimated Price</div>
        <div className="text-5xl font-extrabold text-indigo-600 my-2">
          ${estimate.totalEstimate.toFixed(2)}
        </div>
      </div>
      
      <div className="text-left max-w-md mx-auto space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-2">Price Breakdown</h3>
          <div className="flex justify-between items-center text-gray-700">
            <span>Base Service Price</span>
            <span className="font-medium">${estimate.basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700 mt-1">
            <span>Condition Surcharge ({estimate.surchargePercentage}%)</span>
            <span className="font-medium">+ ${estimate.surchargeAmount.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between items-center font-bold text-gray-900">
            <span>Total Estimated Cost</span>
            <span>${estimate.totalEstimate.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-2">AI Pricing Rationale</h3>
          <p className="text-gray-700 text-sm italic">"{estimate.reasoning}"</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          A final price will be confirmed upon in-person inspection of the vehicle. This estimate is valid for 14 days.
        </p>
        <button
          onClick={onReset}
          className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Start a New Assessment
        </button>
      </div>
    </div>
  );
};

export default Step4Estimate;
