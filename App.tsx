
import React, { useState, useCallback } from 'react';
import type { AssessmentData, EstimateResult } from './types';
import { getAIPriceEstimate } from './services/geminiService';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Step1ClientDetails from './components/Step1ClientDetails';
import Step2VehicleInfo from './components/Step2VehicleInfo';
import Step3Condition from './components/Step3Condition';
import Step4Estimate from './components/Step4Estimate';
import LoadingSpinner from './components/LoadingSpinner';

const TOTAL_STEPS = 3;

export default function App(): React.ReactElement {
  const [step, setStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    client: { name: '', email: '', phone: '' },
    vehicle: { year: '', make: '', model: '', vin: '' },
    condition: {
      servicePackage: '',
      vehicleSize: '',
      exterior: 'Good',
      interior: 'Good',
      issues: [],
    },
  });
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAssessmentData = useCallback((data: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({
      ...prev,
      ...data,
      client: { ...prev.client, ...data.client },
      vehicle: { ...prev.vehicle, ...data.vehicle },
      condition: { ...prev.condition, ...data.condition },
    }));
  }, []);

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS + 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const goToStep = (targetStep: number) => setStep(targetStep);

  const handleFormSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setEstimate(null);
    setStep(TOTAL_STEPS + 1); // Move to the estimate/loading screen

    try {
      // Simulate submitting to a Convex backend which then calls the AI service
      console.log('Simulating submission of assessment data to Convex:', assessmentData);
      const result = await getAIPriceEstimate(assessmentData);
      setEstimate(result);
    } catch (err) {
      console.error('Error generating estimate:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate an estimate. ${errorMessage}. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAssessmentData({
      client: { name: '', email: '', phone: '' },
      vehicle: { year: '', make: '', model: '', vin: '' },
      condition: { servicePackage: '', vehicleSize: '', exterior: 'Good', interior: 'Good', issues: [] },
    });
    setEstimate(null);
    setError(null);
    setIsLoading(false);
  };

  const renderStep = () => {
    if (step > TOTAL_STEPS) {
      if (isLoading) {
        return <div className="text-center p-8"><LoadingSpinner /><p className="mt-4 text-lg text-gray-600">Calculating your custom estimate...</p></div>;
      }
      if (error) {
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        );
      }
      if (estimate) {
        return <Step4Estimate estimate={estimate} onReset={handleReset} />;
      }
    }

    switch (step) {
      case 1:
        return <Step1ClientDetails data={assessmentData.client} updateData={updateAssessmentData} nextStep={nextStep} />;
      case 2:
        return <Step2VehicleInfo data={assessmentData.vehicle} updateData={updateAssessmentData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3Condition data={assessmentData.condition} updateData={updateAssessmentData} handleSubmit={handleFormSubmit} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="bg-white rounded-xl shadow-lg mt-6">
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} goToStep={goToStep}/>
          <div className="p-6 sm:p-8">
            {renderStep()}
          </div>
        </main>
        <footer className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Slick Solutions. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
