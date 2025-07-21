import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  passportSeries: string;
  passportNumber: string;
  loanAmount: number;
  loanPeriod: number;
}

export function useTildaIntegration() {
  const [isLoading, setIsLoading] = useState(false);

  const submitToTilda = async (data: any) => {
    const TILDA_FORM_ID = 'form591843265'; 
    const TILDA_PROJECT_ID = '1234567'; 
    
    try {
      const formData = new FormData();
      formData.append('formservices', '1');
      formData.append('formid', TILDA_FORM_ID);
      formData.append('projectid', TILDA_PROJECT_ID);
      formData.append('tilda-success-url', window.location.origin);
      
      Object.keys(data).forEach(key => {
        formData.append(`input[${key}]`, data[key]);
      });
      
      formData.append('input[Источник]', 'Калькулятор займов');
      formData.append('input[Дата заявки]', new Date().toLocaleString('ru-RU'));
      formData.append('input[Процентная ставка]', '1.5% в день');
      formData.append('input[IP адрес]', 'auto');
      
      const response = await fetch('https://forms.tildacdn.com/api/getform/', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.text();
        console.log('Заявка успешно отправлена в Tilda CRM:', result);
        alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в течение 15 минут.');
        return true;
      } else {
        console.error('Ошибка отправки в Tilda CRM:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки в Tilda:', error);
      return false;
    }
  };

  const handleFormSubmit = async (formData: FormData, loanAmount: number, loanPeriod: number, interestRate: number) => {
    setIsLoading(true);
    
    const totalAmount = loanAmount + (loanAmount * interestRate * loanPeriod / 100);
    
    const submitData = {
      'name': `${formData.firstName} ${formData.lastName}`,
      'phone': formData.phone,
      'email': formData.email,
      'passport_series': formData.passportSeries,
      'passport_number': formData.passportNumber,
      'loan_amount': `${loanAmount.toLocaleString()} руб`,
      'loan_period': `${loanPeriod} дней`,
      'total_amount': `${totalAmount.toLocaleString()} руб`,
      'interest_rate': `${((loanAmount * interestRate * loanPeriod) / 100).toLocaleString()} руб`,
      'lead_source': 'Сайт калькулятора займов',
      'status': 'Новая заявка'
    };
    
    const success = await submitToTilda(submitData);
    setIsLoading(false);
    
    if (!success) {
      alert('⚠️ Произошла ошибка при отправке заявки. Проверьте данные и попробуйте еще раз.');
    }
    
    return success;
  };

  return {
    handleFormSubmit,
    isLoading
  };
}