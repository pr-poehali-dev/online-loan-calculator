import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function DocumentsSection() {
  return (
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
  );
}