import React, { createContext, useContext, useEffect, useState } from 'react';

type Inputs = {
  phoneNumber: string;
  email: string;
  name: string;
};

type StepContextType = {
  step: number;
  prevStep: () => void;
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

  useEffect(() => {
    const savedStep = localStorage.getItem('step');
    const savedFormState = localStorage.getItem('formState');

    if (savedStep) {
      setStep(parseInt(savedStep));
    }

    if (savedFormState) {
      setFormState(JSON.parse(savedFormState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('step', step.toString());
  }, [step]);

  useEffect(() => {
    localStorage.setItem('formState', JSON.stringify(formState));
  }, [formState]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <StepContext.Provider
      value={{ step, prevStep, nextStep, formState, setFormState }}
    >
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
