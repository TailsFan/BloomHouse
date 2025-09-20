import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from './figma/ImageWithFallback';
// Using emoji icons instead of lucide-react
// import { Search, ShoppingCart, Heart, Star, Filter } from "lucide-react";
import { Badge } from "./ui/badge";

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const bouquets = [
  {
    id: 1,
    name: "Классический букет красных роз",
    image: "https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldCUyMHJvc2VzfGVufDF8fHx8MTc1NzE2MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 3450,
    category: "Розы",
    rating: 5,
    reviews: 127,
    isPopular: true,
    isNew: false,
    description: "15 красных роз в элегантной упаковке"
  },
  {
    id: 2,
    name: "Свадебный букет из белых цветов",
    image: "https://images.unsplash.com/photo-1700142611715-8a023c5eb8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMHdoaXRlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTcxNjA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 5200,
    category: "Свадебные",
    rating: 5,
    reviews: 89,
    isPopular: true,
    isNew: false,
    description: "Нежный свадебный букет из белых роз и лилий"
  },
  {
    id: 3,
    name: "Весенний микс ярких цветов",
    image: "https://images.unsplash.com/photo-1619962992057-be492a5816f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNwcmluZyUyMGZsb3dlciUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU3MTYwODMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 2890,
    category: "Микс",
    rating: 4,
    reviews: 203,
    isPopular: true,
    isNew: false,
    description: "Яркий весенний букет из тюльпанов и нарциссов"
  },
  {
    id: 4,
    name: "Романтичные розовые розы",
    image: "https://images.unsplash.com/photo-1695050193946-3a3bde70c2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0JTIwcm9tYW50aWN8ZW58MXx8fHwxNzU3MTYwODMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 4100,
    category: "Розы",
    rating: 5,
    reviews: 156,
    isPopular: true,
    isNew: false,
    description: "21 розовая роза с зеленью и упаковкой"
  },
  {
    id: 5,
    name: "Элегантный микс",
    image: "https://images.unsplash.com/photo-1699830008232-fe4ae2a6ee11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaXhlZCUyMGZsb3dlciUyMGJvdXF1ZXQlMjBlbGVnYW50fGVufDF8fHx8MTc1NzE2MzMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 3750,
    category: "Микс",
    rating: 4,
    reviews: 95,
    isPopular: false,
    isNew: true,
    description: "Стильная композиция из роз и лилий"
  },
  {
    id: 6,
    name: "Солнечные подсолнухи",
    image: "https://images.unsplash.com/photo-1752765579894-9a7aef6fb359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdW5mbG93ZXIlMjBib3VxdWV0JTIwYnJpZ2h0fGVufDF8fHx8MTc1NzE2MDgzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 2450,
    category: "Подсолнухи",
    rating: 4,
    reviews: 78,
    isPopular: false,
    isNew: true,
    description: "Яркий букет из свежих подсолнухов"
  },
  {
    id: 7,
    name: "Букет из хризантем",
    image: "https://images.unsplash.com/photo-1666869689643-ca221e2b1ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjaHJ5c2FudGhlbXVtJTIwZmxvd2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NzE2MzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1890,
    category: "Хризантемы",
    rating: 4,
    reviews: 134,
    isPopular: false,
    isNew: false,
    description: "Пышный букет из разноцветных хризантем"
  },
  {
    id: 8,
    name: "Премиум композиция",
    image: "https://images.unsplash.com/photo-1699830008232-fe4ae2a6ee11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaXhlZCUyMGZsb3dlciUyMGJvdXF1ZXQlMjBlbGVnYW50fGVufDF8fHx8MTc1NzE2MzMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 6890,
    category: "Премиум",
    rating: 5,
    reviews: 42,
    isPopular: false,
    isNew: true,
    description: "Эксклюзивная композиция из редких цветов"
  }
];

const categories = ["Все", "Розы", "Микс", "Свадебные", "Хризантемы", "Подсолнухи", "Премиум"];

export function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("popular");

  const filteredBouquets = bouquets
    .filter(bouquet => {
      const matchesSearch = bouquet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Все" || bouquet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.isPopular ? 1 : -1;
      }
    });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            🌺 Каталог букетов
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          {/* Фильтры и поиск */}
          <div className="bg-warm-rose p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
                <Input
                  placeholder="Поиск букетов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-white"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">По цене (по возрастанию)</option>
                <option value="price-desc">По цене (по убыванию)</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          {/* Результаты поиска */}
          <div>
            <p className="text-muted-foreground mb-4">
              Найдено букетов: {filteredBouquets.length}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBouquets.map((bouquet) => (
                <div key={bouquet.id} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src={bouquet.image}
                      alt={bouquet.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {bouquet.isPopular && (
                        <Badge className="bg-rose-accent text-white">Популярный</Badge>
                      )}
                      {bouquet.isNew && (
                        <Badge className="bg-green-500 text-white">Новинка</Badge>
                      )}
                    </div>
                    
                    {/* Favorite button */}
                    <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <span className="text-lg text-rose-accent">❤️</span>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-foreground mb-2">{bouquet.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{bouquet.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < bouquet.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({bouquet.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">{bouquet.price.toLocaleString()} ₽</span>
                      <Button 
                        size="sm"
                        className="bg-rose-accent hover:bg-rose-dark text-white"
                      >
                        <span className="text-sm mr-2">🛒</span>
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredBouquets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Букеты не найдены</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Попробуйте изменить фильтры или поисковый запрос
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}