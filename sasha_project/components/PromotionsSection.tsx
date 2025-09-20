import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
// Using emoji icons instead of lucide-react
// import { ArrowRight, Tag, Clock } from "lucide-react";

const promotionalProducts = [
  {
    image: "https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldCUyMHJvc2VzfGVufDF8fHx8MTc1NzE2MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Букет красных роз премиум",
    price: "2760",
    originalPrice: "3450",
    discount: "20%",
    rating: 5,
    reviewsCount: 127
  },
  {
    image: "https://images.unsplash.com/photo-1700142611715-8a023c5eb8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN3ZWRkaW5nJTIwYm91cXVldCUyMHdoaXRlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTcxNjA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Белоснежная элегантность",
    price: "4160",
    originalPrice: "5200",
    discount: "20%",
    rating: 5,
    reviewsCount: 89
  }
];

export function PromotionsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Promotion Banner */}
        <div className="bg-gradient-to-r from-rose/20 to-sage-green/20 rounded-2xl p-8 mb-12 border border-rose/30">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-xl text-rose-accent mr-2">🏷️</span>
                <span className="bg-rose-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Акция недели
                </span>
              </div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Скидка 20% на все букеты роз
              </h2>
              <p className="text-muted-foreground mb-6">
                Только до конца недели! Создайте незабываемые моменты с нашими 
                роскошными букетами из премиальных роз.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="text-sm mr-1">⏰</span>
                  До конца акции: 3 дня 14 часов
                </div>
              </div>
              <Button size="lg" className="bg-rose-accent hover:bg-rose-dark text-white">
                Выбрать букет роз
                <span className="ml-2 text-sm">→</span>
              </Button>
            </div>
            
            {/* Promotional Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {promotionalProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Promotions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Free Delivery Promo */}
          <div className="bg-sage-green/10 rounded-xl p-6 border border-sage-green/20">
            <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Бесплатная доставка</h3>
            <p className="text-sm text-muted-foreground mb-4">
              При заказе от 3000 рублей доставляем бесплатно в пределах МКАД
            </p>
            <Button variant="outline" size="sm" className="border-sage-green text-sage-green hover:bg-sage-green hover:text-white">
              Подробнее
            </Button>
          </div>

          {/* Loyalty Program */}
          <div className="bg-rose/10 rounded-xl p-6 border border-rose/20">
            <div className="w-12 h-12 bg-rose/30 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Программа лояльности</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Копите баллы с каждой покупки и получайте скидки до 15%
            </p>
            <Button variant="outline" size="sm" className="border-rose-accent text-rose-accent hover:bg-rose-accent hover:text-white">
              Участвовать
            </Button>
          </div>

          {/* Subscription */}
          <div className="bg-warm-rose/30 rounded-xl p-6 border border-rose-light/40">
            <div className="w-12 h-12 bg-rose-light/40 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Подписка на цветы</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Регулярная доставка свежих букетов со скидкой 10%
            </p>
            <Button variant="outline" size="sm" className="border-rose-dark text-rose-dark hover:bg-rose-dark hover:text-white">
              Оформить
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}