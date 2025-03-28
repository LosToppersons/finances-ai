import React, { createContext, useContext, useState } from 'react';

type Inputs = {
  phoneNumber: string;
  email: string;
  name: string;
};

type StepContextType = {
  step: number;
  nextStep: () => void;
  formState: Inputs;
  setFormState: React.Dispatch<React.SetStateAction<Inputs>>;
};

const StepContext = createContext<StepContextType | null>(null);

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<Inputs>({
    phoneNumber: '',
    email: '',
    name: '',
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <StepContext.Provider value={{ step, nextStep, formState, setFormState }}>
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
