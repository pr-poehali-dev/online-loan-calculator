import React from 'react';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
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
  );
}