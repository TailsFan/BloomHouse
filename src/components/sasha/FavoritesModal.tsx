"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

interface FavoriteItem {
  id: string; // Firestore document ID
  bouquetId: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  addedDate: string;
}

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const favoritesCollection = collection(db, "users", user.uid, "favorites");
          const favoritesSnapshot = await getDocs(favoritesCollection);
          const favoritesList = favoritesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FavoriteItem));
          setFavorites(favoritesList);
        } catch (error) {
          console.error("Error fetching favorites: ", error);
        }
        setLoading(false);
      };

      fetchFavorites();
    } else if (!user) {
        setFavorites([]);
    }
  }, [isOpen, user]);

  const removeFromFavorites = async (id: string) => {
    if (!user) return;
    try {
        await deleteDoc(doc(db, "users", user.uid, "favorites", id));
        setFavorites(prev => prev.filter(item => item.id !== id));
    } catch (error) {
        console.error("Error removing from favorites: ", error);
    }
  };

  const addToCart = (id: string) => {
    alert("Товар добавлен в корзину!");
  };

  if (!user && isOpen) {
     return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
              <Heart /> Избранное
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-foreground mb-2">Войдите, чтобы посмотреть избранное</h3>
            <p className="text-muted-foreground mb-6">
              Сохраняйте понравившиеся букеты, чтобы не потерять их.
            </p>
            <Button onClick={onClose} className="bg-rose-accent hover:bg-rose-dark text-white">
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  if (loading && isOpen) {
    return (
       <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
           <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
              <Heart /> Избранное
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка избранного...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (favorites.length === 0 && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
              <Heart /> Избранное
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
          <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
            <Heart /> Избранное ({favorites.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-muted-foreground mb-6">
            Ваши любимые букеты, сохраненные для быстрого заказа
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  
                  <button 
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors group"
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Добавлено {new Date(item.addedDate).toLocaleDateString('ru-RU')}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 h-10">{item.description}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
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
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-rose-accent hover:bg-rose-dark text-white"
                        onClick={() => addToCart(item.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-accent rounded-lg">
            <h4 className="font-medium text-foreground mb-3">💡 Совет</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Добавляйте букеты в избранное, чтобы не потерять понравившиеся варианты. 
              Вы всегда сможете вернуться к ним позже!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="text-rose-accent h-4 w-4" />
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
