import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageWithFallback } from './figma/ImageWithFallback';
// Using emoji icons instead of lucide-react
// import { ShoppingCart, Heart } from "lucide-react";

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const gifts = [
  {
    id: 1,
    name: "Плюшевый мишка классический",
    image: "https://images.unsplash.com/photo-1547567987-216150fb814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjBzb2Z0JTIwdG95fGVufDF8fHx8MTc1NzE2MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "890",
    description: "Мягкий плюшевый мишка 30 см"
  },
  {
    id: 2,
    name: "Набор мини-игрушек",
    image: "https://images.unsplash.com/photo-1719556359001-2d7ce40a9d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjdXRlJTIwcGx1c2glMjBhbmltYWxzJTIwdG95c3xlbnwxfHx8fDE3NTcxNjMxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "1250",
    description: "Набор из 3 мини-игрушек"
  },
  {
    id: 3,
    name: "Плюшевый зайчик",
    image: "https://images.unsplash.com/photo-1547567987-216150fb814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjBzb2Z0JTIwdG95fGVufDF8fHx8MTc1NzE2MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "750",
    description: "Мягкий зайчик 25 см"
  },
  {
    id: 4,
    name: "Большой мишка",
    image: "https://images.unsplash.com/photo-1719556359001-2d7ce40a9d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjdXRlJTIwcGx1c2glMjBhbmltYWxzJTIwdG95c3xlbnwxfHx8fDE3NTcxNjMxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "1890",
    description: "Большой плюшевый мишка 50 см"
  }
];

export function GiftsModal({ isOpen, onClose }: GiftsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            🧸 Мягкие игрушки в подарок
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-muted-foreground mb-6">
            Дополните ваш букет милой мягкой игрушкой и сделайте подарок еще более особенным!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gifts.map((gift) => (
              <div key={gift.id} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <span className="text-lg text-rose-accent">❤️</span>
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2">{gift.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{gift.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">{gift.price} ₽</span>
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
          
          <div className="mt-8 p-4 bg-rose rounded-lg">
            <h4 className="font-medium text-foreground mb-2">💝 Специальное предложение</h4>
            <p className="text-sm text-muted-foreground">
              При покупке букета от 3000 ₽ - скидка 20% на любую мягкую игрушку!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}