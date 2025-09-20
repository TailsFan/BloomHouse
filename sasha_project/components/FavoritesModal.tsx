import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageWithFallback } from './figma/ImageWithFallback';
// Using emoji icons instead of lucide-react
// import { ShoppingCart, Heart, Star, Trash2 } from "lucide-react";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Мок данные избранного
const initialFavorites = [
  {
    id: 1,
    name: "Классический букет красных роз",
    image: "https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldCUyMHJvc2VzfGVufDF8fHx8MTc1NzE2MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 3450,
    rating: 5,
    reviews: 127,
    description: "15 красных роз в элегантной упаковке",
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Весенний микс ярких цветов",
    image: "https://images.unsplash.com/photo-1619962992057-be492a5816f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNwcmluZyUyMGZsb3dlciUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU3MTYwODMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 2890,
    rating: 4,
    reviews: 203,
    description: "Яркий весенний букет из тюльпанов и нарциссов",
    addedDate: "2024-01-10"
  }
];

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    alert("Товар добавлен в корзину!");
  };

  if (favorites.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary">
              ❤️ Избранное
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-lg font-medium text-foreground mb-2">Список избранного пуст</h3>
            <p className="text-muted-foreground mb-6">
              Добавляйте понравившиеся букеты в избранное, нажимая на ❤️
            </p>
            <Button onClick={onClose} className="bg-rose-accent hover:bg-rose-dark text-white">
              Выбрать букеты
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            ❤️ Избранное ({favorites.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-muted-foreground mb-6">
            Ваши любимые букеты, сохраненные для быстрого заказа
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Remove from favorites button */}
                  <button 
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors group"
                  >
                    <span className="text-lg text-red-500 group-hover:scale-110 transition-transform">❤️</span>
                  </button>
                  
                  {/* Added date */}
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Добавлено {new Date(item.addedDate).toLocaleDateString('ru-RU')}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < item.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({item.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">
                      {item.price.toLocaleString()} ₽
                    </span>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromFavorites(item.id)}
                        className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <span className="text-sm">🗑️</span>
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-rose-accent hover:bg-rose-dark text-white"
                        onClick={() => addToCart(item.id)}
                      >
                        <span className="text-sm mr-2">🛒</span>
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Рекомендации */}
          <div className="mt-8 p-6 bg-accent rounded-lg">
            <h4 className="font-medium text-foreground mb-3">💡 Совет</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Добавляйте букеты в избранное, чтобы не потерять понравившиеся варианты. 
              Вы всегда сможете вернуться к ним позже!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-rose-accent">❤️</span>
                <span>Сохраняйте понравившиеся букеты</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-accent">🔔</span>
                <span>Получайте уведомления о скидках</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-accent">⚡</span>
                <span>Быстрое оформление заказа</span>
              </div>
            </div>
          </div>
          
          {/* Действия */}
          <div className="mt-6 flex gap-4">
            <Button 
              onClick={onClose}
              className="bg-rose-accent hover:bg-rose-dark text-white"
            >
              Продолжить покупки
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                favorites.forEach(item => addToCart(item.id));
              }}
              className="border-rose-accent text-rose-accent hover:bg-rose hover:text-rose-accent"
            >
              Добавить все в корзину
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}