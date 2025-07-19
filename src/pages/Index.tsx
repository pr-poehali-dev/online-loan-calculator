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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Icon name="DollarSign" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                ФинансПро
              </span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#calculator" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Калькулятор</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">О компании</a>
              <a href="#documents" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Документы</a>
              <a href="#contacts" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Контакты</a>
            </nav>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-6 py-2"
            >
              Подать заявку
            </Button>
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
      <section id="calculator" className="py-32 px-4 bg-white">
        <div className="container mx-auto max-w-full px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Калькулятор займа</h2>
            <p className="text-xl text-gray-600">Рассчитайте сумму и условия займа за несколько секунд</p>
          </div>

          <Card className="relative overflow-hidden border-0 shadow-2xl max-w-8xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
            <CardContent className="relative p-16">
              <div className="grid lg:grid-cols-2 gap-24">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-800">Сумма займа</Label>
                    <div className="relative">
                      <Input
                        type="range"
                        min="1000"
                        max="45000"
                        step="1000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>1 000 ₽</span>
                        <span>45 000 ₽</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-blue-600">{loanAmount.toLocaleString()} ₽</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold text-gray-800">Срок займа (дней)</Label>
                    <div className="relative">
                      <Input
                        type="range"
                        min="1"
                        max="30"
                        value={loanPeriod}
                        onChange={(e) => setLoanPeriod(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>1 день</span>
                        <span>30 дней</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-600">{loanPeriod} дней</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-blue-500 to-green-500 text-white border-0">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-100">Сумма займа:</span>
                          <span className="text-xl font-bold">{loanAmount.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-100">Проценты:</span>
                          <span className="text-xl font-bold">{((loanAmount * interestRate * loanPeriod) / 100).toLocaleString()} ₽</span>
                        </div>
                        <Separator className="bg-white/20" />
                        <div className="flex justify-between items-center">
                          <span className="text-blue-100">К возврату:</span>
                          <span className="text-2xl font-bold">{totalAmount.toLocaleString()} ₽</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={() => setIsFormOpen(true)}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Подать заявку
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Имя</Label>
                      <Input placeholder="Введите имя" />
                    </div>
                    <div>
                      <Label>Фамилия</Label>
                      <Input placeholder="Введите фамилию" />
                    </div>
                  </div>
                  <div>
                    <Label>Номер телефона</Label>
                    <Input placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="example@mail.ru" />
                  </div>
                  <div>
                    <Label>Серия и номер паспорта</Label>
                    <Input placeholder="1234 567890" />
                  </div>
                  <Button onClick={() => setApplicationStep(2)} className="w-full">
                    Далее
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
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #2563eb, #059669);
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #2563eb, #059669);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}