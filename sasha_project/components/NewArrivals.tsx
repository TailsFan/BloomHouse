import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
// Using emoji icons instead of lucide-react
// import { ArrowRight, Sparkles } from "lucide-react";

const newProducts = [
  {
    image: "https://images.unsplash.com/photo-1752765579894-9a7aef6fb359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBib3VxdWV0JTIwYnJpZ2h0fGVufDF8fHx8MTc1NzE2MDgzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Солнечный букет подсолнухов",
    price: "2650",
    isNew: true,
    rating: 5,
    reviewsCount: 23
  },
  {
    image: "https://images.unsplash.com/photo-1749547533546-8241bf042f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaXhlZCUyMGZsb3dlciUyMGJvdXF1ZXQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTcxNjA4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Яркий микс сезонных цветов",
    price: "3280",
    isNew: true,
    rating: 4,
    reviewsCount: 41
  },
  {
    image: "https://images.unsplash.com/photo-1695050193946-3a3bde70c2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0JTIwcm9tYW50aWN8ZW58MXx8fHwxNzU3MTYwODMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Нежные пионовидные розы",
    price: "4750",
    isNew: true,
    rating: 5,
    reviewsCount: 18
  }
];

export function NewArrivals() {
  return (
    <section className="py-16 bg-gradient-to-br from-accent to-warm-rose">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-xl text-rose-accent mr-2">✨</span>
            <span className="text-rose-accent font-medium">Новинки</span>
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Свежие поступления
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Новые уникальные композиции и сезонные букеты. 
            Будьте первыми, кто оценит наши последние творения
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {newProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button size="lg" className="bg-rose-accent hover:bg-rose-dark text-white">
            Посмотреть все новинки
            <span className="ml-2 text-sm">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}