import { Button } from "./ui/button";
// Using emoji icons instead of lucide-react
// import { ArrowRight, Truck, Clock, Award } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onOpenModal: (modal: string) => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-warm-rose via-white to-accent overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground leading-tight">
                Свежие букеты с
                <span className="text-primary"> доставкой</span> по городу
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Создаём уникальные композиции из самых свежих цветов. 
                Каждый букет — это произведение искусства, созданное с любовью.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-rose-accent hover:bg-rose-dark text-white"
                onClick={() => onOpenModal('catalog')}
              >
                Выбрать букет
                <span className="ml-2 text-sm">→</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-rose-accent text-rose-accent hover:bg-rose hover:text-rose-accent"
                onClick={() => onOpenModal('create')}
              >
                Создать свой
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg">🚚</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Быстрая доставка</h3>
                  <p className="text-sm text-muted-foreground">За 2 часа</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg">⏰</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Работаем 24/7</h3>
                  <p className="text-sm text-muted-foreground">Без выходных</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg">🏆</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Гарантия качества</h3>
                  <p className="text-sm text-muted-foreground">Свежесть 7 дней</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldCUyMHJvc2VzfGVufDF8fHx8MTc1NzE2MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Элегантный букет роз"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sage-green/20 rounded-full blur-2xl"></div>
            
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">Доставили 127 букетов сегодня</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}