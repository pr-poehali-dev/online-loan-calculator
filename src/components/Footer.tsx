import React from 'react';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
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
  );
}