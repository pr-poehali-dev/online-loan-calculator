import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface LoanCalculatorProps {
  loanAmount: number;
  setLoanAmount: (amount: number) => void;
  loanPeriod: number;
  setLoanPeriod: (period: number) => void;
  totalAmount: number;
  interestRate: number;
  onApplyClick: () => void;
}

export default function LoanCalculator({
  loanAmount,
  setLoanAmount,
  loanPeriod,
  setLoanPeriod,
  totalAmount,
  interestRate,
  onApplyClick
}: LoanCalculatorProps) {
  return (
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
                  <Label className="text-lg md:text-2xl font-bold text-gray-800 flex items-center gap-2">
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
                  onClick={onApplyClick}
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
  );
}