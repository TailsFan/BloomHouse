"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/smart-dialog";
import { Droplets, Scissors, Sun, Thermometer, Clock, Heart } from "lucide-react";

interface CareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const careInstructions = [
  {
    icon: <Droplets className="text-primary" />,
    title: "Полив",
    description: "Меняйте воду каждые 2-3 дня. Используйте прохладную отстоянную воду.",
    tips: ["Добавьте каплю средства для срезанных цветов", "Наполняйте вазу на 2/3 объема"]
  },
  {
    icon: <Scissors className="text-primary" />,
    title: "Обрезка стеблей",
    description: "Обрезайте стебли под углом 45° под проточной водой каждые 3-4 дня.",
    tips: ["Используйте острый нож или секатор", "Обрезайте на 1-2 см от низа"]
  },
  {
    icon: <Thermometer className="text-primary" />,
    title: "Температура",
    description: "Оптимальная температура для букета: 18-22°C.",
    tips: ["Избегайте резких перепадов температур", "Не ставьте рядом с отопительными приборами"]
  },
  {
    icon: <Sun className="text-primary" />,
    title: "Освещение",
    description: "Избегайте прямых солнечных лучей и сквозняков.",
    tips: ["Выберите место с рассеянным светом", "Не ставьте на подоконник"]
  }
];

const flowerTypes = [
  {
    name: "Розы",
    care: "Обновляйте срез каждые 2 дня. Удаляйте увядшие лепестки. Срок жизни: 7-10 дней.",
    icon: "🌹"
  },
  {
    name: "Тюльпаны",
    care: "Подрезайте стебли в холодной воде. Не ставьте в теплое место. Срок жизни: 5-7 дней.",
    icon: "🌷"
  },
  {
    name: "Хризантемы",
    care: "Удаляйте листья под водой. Меняйте воду через день. Срок жизни: 10-14 дней.",
    icon: "🌼"
  },
  {
    name: "Лилии",
    care: "Удаляйте пыльники для продления жизни. Срок жизни: 7-10 дней.",
    icon: "🌺"
  }
];

export function CareModal({ isOpen, onClose }: CareModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
            <Heart />
            Как ухаживать за букетами
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          <div className="bg-warm-rose p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Clock className="text-primary" />
              Гарантия свежести 7 дней
            </h3>
            <p className="text-sm text-muted-foreground">
              При соблюдении наших рекомендаций ваш букет будет радовать вас не менее недели!
            </p>
          </div>

          {/* Общие правила ухода */}
          <div>
            <h3 className="text-xl font-medium text-foreground mb-4">Общие правила ухода</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careInstructions.map((instruction, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3 text-2xl">
                    {instruction.icon}
                    <h4 className="font-medium text-foreground">{instruction.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{instruction.description}</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {instruction.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-1">
                        <span className="text-primary mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Уход по типам цветов */}
          <div>
            <h3 className="text-xl font-medium text-foreground mb-4">Уход по типам цветов</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flowerTypes.map((flower, index) => (
                <div key={index} className="bg-rose/50 border border-rose-accent/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{flower.icon}</span>
                    <h4 className="font-medium text-foreground">{flower.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{flower.care}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Дополнительные советы */}
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">💡 Дополнительные советы</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Если цветы начали увядать, попробуйте поставить их в холодную воду на 1-2 часа</li>
              <li>• Добавление аспирина (1 таблетка на литр воды) поможет продлить жизнь букета</li>
              <li>• Опрыскивайте лепестки водой из пульверизатора утром и вечером</li>
              <li>• Удаляйте увядшие цветы и листья сразу же</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
