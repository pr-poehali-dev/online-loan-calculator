import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LoanCalculator from '@/components/LoanCalculator';
import ApplicationForm from '@/components/ApplicationForm';
import AboutSection from '@/components/AboutSection';
import DocumentsSection from '@/components/DocumentsSection';
import Footer from '@/components/Footer';
import SliderStyles from '@/components/SliderStyles';
import { useTildaIntegration } from '@/hooks/useTildaIntegration';

export default function Index() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanPeriod, setLoanPeriod] = useState(30);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isApproved, setIsApproved] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    passportSeries: '',
    passportNumber: '',
    loanAmount: 15000,
    loanPeriod: 30
  });

  const { handleFormSubmit } = useTildaIntegration();
  const interestRate = 1.5;
  const totalAmount = loanAmount + (loanAmount * interestRate * loanPeriod / 100);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsProcessing(false);
      setIsApproved(true);
      setApplicationStep(4);
    }
    return () => clearInterval(interval);
  }, [isProcessing, timer]);

  const handleApplicationSubmit = () => {
    setIsProcessing(true);
    setApplicationStep(3);
    setTimer(60);
  };

  const onFormSubmit = async () => {
    const success = await handleFormSubmit(formData, loanAmount, loanPeriod, interestRate);
    
    if (success) {
      setApplicationStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <HeroSection />
      
      <LoanCalculator
        loanAmount={loanAmount}
        setLoanAmount={setLoanAmount}
        loanPeriod={loanPeriod}
        setLoanPeriod={setLoanPeriod}
        totalAmount={totalAmount}
        interestRate={interestRate}
        onApplyClick={() => setIsFormOpen(true)}
      />
      
      <ApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        applicationStep={applicationStep}
        setApplicationStep={setApplicationStep}
        formData={formData}
        setFormData={setFormData}
        loanAmount={loanAmount}
        loanPeriod={loanPeriod}
        totalAmount={totalAmount}
        isProcessing={isProcessing}
        timer={timer}
        onFormSubmit={onFormSubmit}
        onApplicationSubmit={handleApplicationSubmit}
      />
      
      <AboutSection />
      <DocumentsSection />
      <Footer />
      <SliderStyles />
    </div>
  );
}