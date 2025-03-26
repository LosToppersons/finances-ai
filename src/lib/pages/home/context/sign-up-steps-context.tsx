import React, { createContext, useContext, useState } from 'react';

type StepContextType = {
  step: number;
  nextStep: () => void;
};

const StepContext = createContext<StepContextType | null>(null);

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <StepContext.Provider value={{ step, nextStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};
