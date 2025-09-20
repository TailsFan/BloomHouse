import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
// Using emoji icons instead of lucide-react
// import { ArrowRight } from "lucide-react";

interface FeaturedSectionProps {
  onOpenModal: (modal: string) => void;
}

const featuredProducts = [
  {
    image: "https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldCUyMHJvc2VzfGVufDF8fHx8MTc1NzE2MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Классический букет красных роз",
    price: "3450",
    isPopular: true,
    rating: 5,
    reviewsCount: 127
  },
  {
    image: "https://images.unsplash.com/photo-1700142611715-8a023c5eb8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMHdoaXRlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTcxNjA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Свадебный букет из белых цветов",
    price: "5200",
    isPopular: true,
    rating: 5,
    reviewsCount: 89
  },
  {
    image: "https://images.unsplash.com/photo-1619962992057-be492a5816f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNwcmluZyUyMGZsb3dlciUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU3MTYwODMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Весенний микс ярких цветов",
    price: "2890",
    isPopular: true,
    rating: 4,
    reviewsCount: 203
  },
  {
    image: "https://images.unsplash.com/photo-1695050193946-3a3bde70c2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0JTIwcm9tYW50aWN8ZW58MXx8fHwxNzU3MTYwODMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Романтичные розовые розы",
    price: "4100",
    isPopular: true,
    rating: 5,
    reviewsCount: 156
  }
];

export function FeaturedSection({ onOpenModal }: FeaturedSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-2">
              Популярные букеты
            </h2>
            <p className="text-muted-foreground">
              Самые любимые композиции наших клиентов
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex items-center border-2 border-rose-accent text-rose-accent hover:bg-rose hover:text-rose-accent"
            onClick={() => onOpenModal('catalog')}
          >
            Все букеты
            <span className="ml-2 text-sm">→</span>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Button 
            variant="outline" 
            className="border-2 border-rose-accent text-rose-accent hover:bg-rose hover:text-rose-accent"
            onClick={() => onOpenModal('catalog')}
          >
            Все букеты
            <span className="ml-2 text-sm">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}