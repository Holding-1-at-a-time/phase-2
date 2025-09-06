
import React from 'react';
import UserIcon from './icons/UserIcon';
import CarIcon from './icons/CarIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
}

const steps = [
  { label: 'Client Info', icon: <UserIcon className="w-6 h-6" /> },
  { label: 'Vehicle Info', icon: <CarIcon className="w-6 h-6" /> },
  { label: 'Condition', icon: <SparklesIcon className="w-6 h-6" /> },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, goToStep }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          
          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => stepNumber < currentStep && goToStep(stepNumber)}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-indigo-600 text-white' : ''}
                    ${isActive ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-600' : ''}
                    ${!isCompleted && !isActive ? 'bg-gray-200 text-gray-500' : ''}
                  `}
                >
                  {step.icon}
                </div>
                <p className={`mt-2 text-sm text-center font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {step.label}
                </p>
              </div>
              {index < totalSteps - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${isCompleted ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
