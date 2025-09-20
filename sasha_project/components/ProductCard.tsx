// Using emoji icons instead of lucide-react
// import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  isNew?: boolean;
  isPopular?: boolean;
  discount?: string;
  rating?: number;
  reviewsCount?: number;
}

export function ProductCard({ 
  image, 
  title, 
  price, 
  originalPrice, 
  isNew, 
  isPopular, 
  discount,
  rating,
  reviewsCount 
}: ProductCardProps) {
  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-sage-green text-white">Новинка</Badge>
          )}
          {isPopular && (
            <Badge className="bg-rose-accent text-white">Популярное</Badge>
          )}
          {discount && (
            <Badge variant="destructive">-{discount}</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white shadow-sm">
            <span className="text-lg">❤️</span>
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white shadow-sm">
            <span className="text-lg">👁️</span>
          </Button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full bg-rose-accent hover:bg-rose-dark text-white">
            <span className="text-sm mr-2">🛒</span>
            В корзину
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Rating */}
        {rating && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            {reviewsCount && (
              <span className="text-xs text-muted-foreground">({reviewsCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-foreground">{price} ₽</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{originalPrice} ₽</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}