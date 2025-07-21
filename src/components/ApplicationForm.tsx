import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

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

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  applicationStep: number;
  setApplicationStep: (step: number) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  loanAmount: number;
  loanPeriod: number;
  totalAmount: number;
  isProcessing: boolean;
  timer: number;
  onFormSubmit: () => void;
  onApplicationSubmit: () => void;
}

export default function ApplicationForm({
  isOpen,
  onClose,
  applicationStep,
  setApplicationStep,
  formData,
  setFormData,
  loanAmount,
  loanPeriod,
  totalAmount,
  isProcessing,
  timer,
  onFormSubmit,
  onApplicationSubmit
}: ApplicationFormProps) {
  if (!isOpen) return null;

  return (
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
                onClick={onFormSubmit} 
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
                <Button onClick={onApplicationSubmit} className="flex-1">
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
              onClick={onClose}
              className="w-full"
            >
              Закрыть
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}