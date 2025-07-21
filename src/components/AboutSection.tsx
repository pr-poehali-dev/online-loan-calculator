import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  return (
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
  );
}