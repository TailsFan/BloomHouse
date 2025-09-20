import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageWithFallback } from './figma/ImageWithFallback';
// Using emoji icons instead of lucide-react
// import { Plus, Minus, ShoppingCart } from "lucide-react";

interface CreateBouquetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const flowers = [
  {
    id: 1,
    name: "Розы красные",
    image: "https://images.unsplash.com/photo-1635350837369-adbaa58a83de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBmbG93ZXJzJTIwZnJlc2h8ZW58MXx8fHwxNzU3MTYzMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 120,
    description: "Классические красные розы"
  },
  {
    id: 2,
    name: "Розы розовые",
    image: "https://images.unsplash.com/photo-1635350837369-adbaa58a83de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBmbG93ZXJzJTIwZnJlc2h8ZW58MXx8fHwxNzU3MTYzMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 110,
    description: "Нежные розовые розы"
  },
  {
    id: 3,
    name: "Розы белые",
    image: "https://images.unsplash.com/photo-1621025210758-0a014e936aaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3aGl0ZSUyMHR1bGlwcyUyMGZyZXNoJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTcxNjMyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 115,
    description: "Элегантные белые розы"
  },
  {
    id: 4,
    name: "Тюльпаны",
    image: "https://images.unsplash.com/photo-1621025210758-0a014e936aaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3aGl0ZSUyMHR1bGlwcyUyMGZyZXNoJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTcxNjMyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 80,
    description: "Весенние тюльпаны"
  },
  {
    id: 5,
    name: "Хризантемы",
    image: "https://images.unsplash.com/photo-1666869689643-ca221e2b1ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjaHJ5c2FudGhlbXVtJTIwZmxvd2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NzE2MzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 70,
    description: "Яркие хризантемы"
  },
  {
    id: 6,
    name: "Лилии",
    image: "https://images.unsplash.com/photo-1666869689643-ca221e2b1ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjaHJ5c2FudGhlbXVtJTIwZmxvd2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NzE2MzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 150,
    description: "Ароматные лилии"
  }
];

const extras = [
  { id: 1, name: "Упаковка премиум", price: 200, description: "Крафт-бумага с лентой" },
  { id: 2, name: "Зелень", price: 100, description: "Эвкалипт и папоротник" },
  { id: 3, name: "Открытка", price: 50, description: "Поздравительная открытка" }
];

export function CreateBouquetModal({ isOpen, onClose }: CreateBouquetModalProps) {
  const [selectedFlowers, setSelectedFlowers] = useState<{[key: number]: number}>({});
  const [selectedExtras, setSelectedExtras] = useState<{[key: number]: boolean}>({});

  const updateFlowerQuantity = (flowerId: number, delta: number) => {
    setSelectedFlowers(prev => {
      const currentQty = prev[flowerId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const { [flowerId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [flowerId]: newQty };
    });
  };

  const toggleExtra = (extraId: number) => {
    setSelectedExtras(prev => ({
      ...prev,
      [extraId]: !prev[extraId]
    }));
  };

  const calculateTotal = () => {
    const flowersTotal = Object.entries(selectedFlowers).reduce((sum, [id, qty]) => {
      const flower = flowers.find(f => f.id === parseInt(id));
      return sum + (flower ? flower.price * qty : 0);
    }, 0);

    const extrasTotal = Object.entries(selectedExtras).reduce((sum, [id, selected]) => {
      if (selected) {
        const extra = extras.find(e => e.id === parseInt(id));
        return sum + (extra ? extra.price : 0);
      }
      return sum;
    }, 0);

    return flowersTotal + extrasTotal;
  };

  const getTotalFlowers = () => {
    return Object.values(selectedFlowers).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            🌸 Создайте свой букет
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка - выбор цветов */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Выберите цветы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flowers.map((flower) => (
                  <div key={flower.id} className="bg-white border border-border rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={flower.image}
                      alt={flower.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-foreground mb-1">{flower.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{flower.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{flower.price} ₽/шт</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateFlowerQuantity(flower.id, -1)}
                            disabled={!selectedFlowers[flower.id]}
                          >
                            <span className="text-sm">−</span>
                          </Button>
                          <span className="w-8 text-center">{selectedFlowers[flower.id] || 0}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateFlowerQuantity(flower.id, 1)}
                          >
                            <span className="text-sm">+</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Дополнения</h3>
              <div className="space-y-3">
                {extras.map((extra) => (
                  <div key={extra.id} className="bg-accent p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{extra.name}</h4>
                      <p className="text-sm text-muted-foreground">{extra.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-primary">{extra.price} ₽</span>
                      <Button
                        size="sm"
                        variant={selectedExtras[extra.id] ? "default" : "outline"}
                        onClick={() => toggleExtra(extra.id)}
                      >
                        {selectedExtras[extra.id] ? "Убрать" : "Добавить"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка - итоги */}
          <div className="lg:col-span-1">
            <div className="bg-warm-rose p-6 rounded-lg sticky top-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Ваш букет</h3>
              
              {getTotalFlowers() === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Выберите цветы для создания букета
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {Object.entries(selectedFlowers).map(([id, qty]) => {
                      const flower = flowers.find(f => f.id === parseInt(id));
                      if (!flower) return null;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span>{flower.name} x{qty}</span>
                          <span>{flower.price * qty} ₽</span>
                        </div>
                      );
                    })}
                    
                    {Object.entries(selectedExtras).map(([id, selected]) => {
                      if (!selected) return null;
                      const extra = extras.find(e => e.id === parseInt(id));
                      if (!extra) return null;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span>{extra.name}</span>
                          <span>{extra.price} ₽</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Итого:</span>
                      <span className="text-primary">{calculateTotal()} ₽</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Всего цветов: {getTotalFlowers()} шт
                    </p>
                  </div>
                  
                  <Button className="w-full bg-rose-accent hover:bg-rose-dark text-white">
                    <span className="text-sm mr-2">🛒</span>
                    Добавить в корзину
                  </Button>
                </div>
              )}
              
              <div className="mt-6 p-3 bg-white/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Минимальное количество цветов в букете — 5 штук
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}