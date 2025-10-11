"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Award, Users, Truck, Phone, MapPin, Mail } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const achievements = [
  { icon: <Heart className="text-primary" />, title: "5000+", description: "Счастливых клиентов" },
  { icon: <Award className="text-primary" />, title: "7 лет", description: "На рынке цветов" },
  { icon: <Users className="text-primary" />, title: "20+", description: "Опытных флористов" },
  { icon: <Truck className="text-primary" />, title: "2 часа", description: "Средняя доставка" }
];

const team = [
  { name: "Анна Иванова", role: "Главный флорист", experience: "10 лет опыта" },
  { name: "Мария Петрова", role: "Дизайнер букетов", experience: "7 лет опыта" },
  { name: "Елена Сидорова", role: "Менеджер по качеству", experience: "5 лет опыта" }
];

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
            🌸 О компании BloomHouse
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          {/* История компании */}
          <div>
            <h3 className="text-xl font-medium text-foreground mb-4">Наша история</h3>
            <div className="bg-warm-rose p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                BloomHouse была основана в 2017 году с простой миссией — делать мир ярче и красивее через 
                искусство флористики. Мы начинали как небольшая студия в центре города, а сегодня являемся 
                одним из ведущих поставщиков свежих цветов и букетов.
              </p>
              <p className="text-muted-foreground">
                Каждый день мы создаем уникальные композиции, которые приносят радость и помогают выражать 
                самые искренние чувства. Наша команда профессиональных флористов работает только с самыми 
                свежими цветами от проверенных поставщиков.
              </p>
            </div>
          </div>

          {/* Достижения */}
          <div>
            <h3 className="text-xl font-medium text-foreground mb-4">Наши достижения</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2 text-2xl">{achievement.icon}</div>
                  <div className="text-2xl font-semibold text-primary mb-1">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Наша команда */}
          <div>
            <h3 className="text-xl font-medium text-foreground mb-4">Наша команда</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {team.map((member, index) => (
                <div key={index} className="bg-rose/50 border border-rose-accent/20 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-1">{member.name}</h4>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.experience}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Наши принципы */}
          <div>
            <h3 className="text-xl font-medium text-foreground mb-4">Наши принципы</h3>
            <div className="bg-accent p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Heart className="text-primary w-5 h-5" />
                    Качество превыше всего
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Мы работаем только с проверенными поставщиками и гарантируем свежесть каждого цветка.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Users className="text-primary w-5 h-5" />
                    Индивидуальный подход
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Каждый букет создается с учетом пожеланий клиента и особенности повода.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Truck className="text-primary w-5 h-5" />
                    Быстрая доставка
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Доставляем заказы в течение 2 часов по всему городу с соблюдением температурного режима.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Award className="text-primary w-5 h-5" />
                    Гарантия результата
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Если букет не соответствует ожиданиям, мы заменим его или вернем деньги.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xl font-medium text-foreground mb-4">Свяжитесь с нами</h3>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-primary w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Телефон</p>
                    <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-primary w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@bloomhouse.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Адрес</p>
                    <p className="text-sm text-muted-foreground">ул. Цветочная, 15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
