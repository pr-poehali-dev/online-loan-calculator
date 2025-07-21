import React from 'react';
import Icon from '@/components/ui/icon';

export default function Header() {
  return (
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
  );
}