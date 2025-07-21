import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanPeriod, setLoanPeriod] = useState(30);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isApproved, setIsApproved] = useState(false);
  
  // Форма данных
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
  
  // Функция отправки в Tilda CRM
  const submitToTilda = async (data: any) => {
    // Конфигурация Tilda - замените на ваши данные
    const TILDA_FORM_ID = 'form591843265'; // ID формы из Tilda
    const TILDA_PROJECT_ID = '1234567'; // ID проекта Tilda
    
    try {
      // Подготовка данных для отправки в Tilda CRM
      const formData = new FormData();
      formData.append('formservices', '1');
      formData.append('formid', TILDA_FORM_ID);
      formData.append('projectid', TILDA_PROJECT_ID);
      formData.append('tilda-success-url', window.location.origin);
      
      // Добавляем данные анкеты
      Object.keys(data).forEach(key => {
        formData.append(`input[${key}]`, data[key]);
      });
      
      // Дополнительные поля для CRM
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
        
        // Уведомление пользователя
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
  
  // Обработчик отправки формы в Tilda CRM
  const handleFormSubmit = async () => {
    // Подготовка данных для CRM
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
    
    if (success) {
      setApplicationStep(2);
    } else {
      alert('⚠️ Произошла ошибка при отправке заявки. Проверьте данные и попробуйте еще раз.');
    }
  };

  const interestRate = 1.5; // 1.5% в день
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Icon name="DollarSign" size={28} className="text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Финанс 5
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  <Icon name="Zap" size={16} className="mr-2" />
                  Быстрое одобрение
                </Badge>
                <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Займы онлайн
                  <br />за 1 минуту
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  От 1 000 до 45 000 рублей на срок до 30 дней. 
                  Моментальное рассмотрение заявки без справок и поручителей.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">1 минута</div>
                    <div className="text-sm text-gray-600">на рассмотрение</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">100% безопасно</div>
                    <div className="text-sm text-gray-600">защищенные данные</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon name="CreditCard" size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">На карту</div>
                    <div className="text-sm text-gray-600">любого банка</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-3xl blur-3xl"></div>
              <img 
                src="/img/5358fabe-dc72-4651-b039-59285bbeecd2.jpg" 
                alt="3D Character" 
                className="relative w-full h-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Калькулятор займа</h2>
            <p className="text-xl text-gray-600">Рассчитайте сумму и условия займа за несколько секунд</p>
          </div>

          <Card className="relative overflow-hidden border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-700 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 animate-pulse"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-bounce"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
            <CardContent className="relative p-4 md:p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start lg:items-center">
                <div className="space-y-6">
                  <div className="space-y-6 p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300">
                    <Label className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Icon name="DollarSign" size={16} className="text-white md:hidden" />
                        <Icon name="DollarSign" size={20} className="text-white hidden md:block" />
                      </div>
                      Сумма займа
                    </Label>
                    <div className="relative p-2 md:p-4">
                      <div className="relative touch-pan-x">
                        <Input
                          type="range"
                          min="1000"
                          max="45000"
                          step="1000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-full h-8 md:h-6 bg-gradient-to-r from-blue-200 to-green-200 rounded-full appearance-none cursor-pointer slider-3d shadow-inner touch-manipulation"
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            touchAction: 'pan-x'
                          }}
                        />
                        <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-20 animate-pulse"></div>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm text-gray-600 mt-2 md:mt-4 font-medium">
                        <span className="bg-white/80 px-2 md:px-3 py-1 rounded-full shadow-sm text-xs md:text-sm">1 000 ₽</span>
                        <span className="bg-white/80 px-2 md:px-3 py-1 rounded-full shadow-sm text-xs md:text-sm">45 000 ₽</span>
                      </div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-2 border-blue-200/50">
                      <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-pulse">
                        {loanAmount.toLocaleString()} ₽
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">Выбранная сумма</div>
                    </div>
                  </div>

                  <div className="space-y-6 p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300">
                    <Label className="text-lg md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Icon name="Calendar" size={16} className="text-white md:hidden" />
                        <Icon name="Calendar" size={20} className="text-white hidden md:block" />
                      </div>
                      Срок займа
                    </Label>
                    <div className="relative p-2 md:p-4">
                      <div className="relative touch-pan-x">
                        <Input
                          type="range"
                          min="1"
                          max="30"
                          value={loanPeriod}
                          onChange={(e) => setLoanPeriod(Number(e.target.value))}
                          className="w-full h-8 md:h-6 bg-gradient-to-r from-green-200 to-blue-200 rounded-full appearance-none cursor-pointer slider-3d shadow-inner touch-manipulation"
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            touchAction: 'pan-x'
                          }}
                        />
                        <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm text-gray-600 mt-2 md:mt-4 font-medium">
                        <span className="bg-white/80 px-2 md:px-3 py-1 rounded-full shadow-sm text-xs md:text-sm">1 день</span>
                        <span className="bg-white/80 px-2 md:px-3 py-1 rounded-full shadow-sm text-xs md:text-sm">30 дней</span>
                      </div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200/50">
                      <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                        {loanPeriod} дней
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 font-medium">Выбранный срок</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-green-400/20 animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse"></div>
                    <CardContent className="relative p-8 backdrop-blur-sm">
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                            <Icon name="Calculator" size={32} className="text-white" />
                          </div>
                          <h3 className="text-2xl font-bold">Расчет займа</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            <span className="text-blue-100 font-medium">Сумма займа:</span>
                            <span className="text-2xl font-bold">{loanAmount.toLocaleString()} ₽</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            <span className="text-blue-100 font-medium">Проценты (1.5%/день):</span>
                            <span className="text-2xl font-bold text-yellow-300">{((loanAmount * interestRate * loanPeriod) / 100).toLocaleString()} ₽</span>
                          </div>
                          <Separator className="bg-white/30 my-4" />
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl border border-yellow-300/30">
                            <span className="text-yellow-100 font-bold text-lg">К возврату:</span>
                            <span className="text-3xl font-bold text-yellow-300 animate-pulse">{totalAmount.toLocaleString()} ₽</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={() => setIsFormOpen(true)}
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white border-0 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-500 animate-pulse hover:animate-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Icon name="Zap" size={20} className="text-white" />
                      </div>
                      <span>Подать заявку сейчас!</span>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform duration-300">
                        <Icon name="ArrowRight" size={20} className="text-white" />
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {applicationStep === 1 && "Персональные данные"}
                {applicationStep === 2 && "Загрузка документов"}
                {applicationStep === 3 && "Рассмотрение заявки"}
                {applicationStep === 4 && "Заявка одобрена!"}
              </CardTitle>
              <CardDescription>
                Шаг {applicationStep} из 4
              </CardDescription>
              <Progress value={applicationStep * 25} className="w-full" />
            </CardHeader>

            <CardContent className="space-y-6">
              {applicationStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Имя</Label>
                      <Input 
                        placeholder="Введите имя" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Фамилия</Label>
                      <Input 
                        placeholder="Введите фамилию"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Номер телефона</Label>
                    <Input 
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      placeholder="example@mail.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Серия паспорта</Label>
                      <Input 
                        placeholder="1234" 
                        value={formData.passportSeries}
                        onChange={(e) => setFormData({...formData, passportSeries: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Номер паспорта</Label>
                      <Input 
                        placeholder="567890" 
                        value={formData.passportNumber}
                        onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">Параметры займа:</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Сумма займа:</span>
                        <span className="font-medium">{loanAmount.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Срок займа:</span>
                        <span className="font-medium">{loanPeriod} дней</span>
                      </div>
                      <div className="flex justify-between border-t pt-1 mt-2">
                        <span>К возврату:</span>
                        <span className="font-bold text-blue-600">{totalAmount.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleFormSubmit} 
                    className="w-full" 
                    disabled={!formData.firstName || !formData.lastName || !formData.phone || !formData.email}
                  >
                    Отправить заявку в Tilda
                  </Button>
                </div>
              )}

              {applicationStep === 2 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Camera" size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Загрузите фото паспорта</h3>
                    <p className="text-gray-600">Сфотографируйте разворот с фото и данными</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Icon name="Upload" size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Нажмите для загрузки или перетащите файл</p>
                    <Button variant="outline">
                      <Icon name="Camera" size={16} className="mr-2" />
                      Выбрать файл
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setApplicationStep(1)} className="flex-1">
                      Назад
                    </Button>
                    <Button onClick={handleApplicationSubmit} className="flex-1">
                      Отправить заявку
                    </Button>
                  </div>
                </div>
              )}

              {applicationStep === 3 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Icon name="Clock" size={32} className="text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Рассматриваем заявку</h3>
                  <p className="text-gray-600">Проверяем данные и принимаем решение</p>
                  
                  <div className="text-6xl font-bold text-blue-600 font-mono">
                    {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
                  </div>
                  
                  <Progress value={(60 - timer) / 60 * 100} className="w-full" />
                </div>
              )}

              {applicationStep === 4 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">Заявка одобрена!</h3>
                  
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex justify-between">
                        <span>Сумма займа:</span>
                        <span className="font-bold">{loanAmount.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Срок займа:</span>
                        <span className="font-bold">{loanPeriod} дней</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Номер договора:</span>
                        <span className="font-bold">FP-{Math.random().toString().substr(2, 8)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span>К возврату:</span>
                        <span className="font-bold text-green-600">{totalAmount.toLocaleString()} ₽</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <p className="text-sm text-gray-600">
                    Деньги поступят на карту в течение 5 минут
                  </p>
                </div>
              )}

              {applicationStep !== 3 && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsFormOpen(false)}
                  className="w-full"
                >
                  Закрыть
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Почему выбирают нас</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Быстро</h3>
                <p className="text-gray-600">Рассмотрение заявки всего за 1 минуту</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Надежно</h3>
                <p className="text-gray-600">Лицензия ЦБ РФ и защита данных</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CreditCard" size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Удобно</h3>
                <p className="text-gray-600">Перевод на карту любого банка</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Необходимые документы</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Паспорт РФ</h3>
                    <p className="text-gray-600">Основной документ, удостоверяющий личность</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Номер телефона</h3>
                    <p className="text-gray-600">Для связи и подтверждения заявки</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={16} className="text-white" />
                </div>
                <span className="text-xl font-bold">ФинансПро</span>
              </div>
              <p className="text-gray-400">Быстрые займы онлайн с моментальным одобрением</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Займы до зарплаты</li>
                <li>Экспресс займы</li>
                <li>Займы на карту</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>8 (800) 123-45-67</li>
                <li>info@finanspro.ru</li>
                <li>Москва, ул. Примерная, 1</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon name="MessageCircle" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon name="Send" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon name="Globe" size={20} />
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 ФинансПро. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .slider-3d::-webkit-slider-thumb {
          appearance: none;
          height: 40px;
          width: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
          border: 3px solid rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          touch-action: manipulation;
        }
        .slider-3d::-webkit-slider-thumb:hover,
        .slider-3d::-webkit-slider-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(59, 130, 246, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.5);
        }
        .slider-3d::-moz-range-thumb {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6);
          cursor: pointer;
          border: 3px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        .slider-3d::-moz-range-thumb:hover,
        .slider-3d::-moz-range-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(59, 130, 246, 0.6);
        }
        .slider-3d::-webkit-slider-track {
          height: 32px;
          border-radius: 16px;
          background: linear-gradient(90deg, #dbeafe, #d1fae5);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-3d::-moz-range-track {
          height: 32px;
          border-radius: 16px;
          background: linear-gradient(90deg, #dbeafe, #d1fae5);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          border: none;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .slider-3d::-webkit-slider-thumb {
            height: 44px;
            width: 44px;
          }
          .slider-3d::-moz-range-thumb {
            height: 44px;
            width: 44px;
          }
          .slider-3d::-webkit-slider-track {
            height: 36px;
            border-radius: 18px;
          }
          .slider-3d::-moz-range-track {
            height: 36px;
            border-radius: 18px;
          }
        }
        
        /* Touch target improvements */
        .slider-3d {
          touch-action: pan-x;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}