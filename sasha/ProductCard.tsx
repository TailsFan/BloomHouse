
"use client";

import Image from 'next/image';
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  isNew?: boolean;
  isPopular?: boolean;
  discount?: string;
  rating?: number;
  reviewsCount?: number;
  description?: string;
}

export function ProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  isNew,
  isPopular,
  discount,
  rating,
  reviewsCount,
  description
}: ProductCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (!user) {
      toast({ title: "Ошибка", description: "Пожалуйста, войдите в систему, чтобы добавить товар в корзину." });
      return;
    }
    try {
      const cartCollection = collection(db, "users", user.uid, "cart");
      const q = query(cartCollection, where("bouquetId", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Item exists, update quantity
        const existingDoc = querySnapshot.docs[0];
        const newQuantity = existingDoc.data().quantity + 1;
        await updateDoc(doc(db, "users", user.uid, "cart", existingDoc.id), { quantity: newQuantity });
         toast({ title: "Успешно!", description: `Количество "${title}" в корзине обновлено.` });
      } else {
        // Item does not exist, add new document
        await addDoc(cartCollection, {
          bouquetId: id,
          name: title,
          image,
          price: parseFloat(price),
          quantity: 1,
          description,
        });
        toast({ title: "Успешно!", description: `"${title}" добавлен в корзину.` });
      }
    } catch (error) {
      console.error("Error adding to cart: ", error);
      toast({ title: "Ошибка", description: "Не удалось добавить товар в корзину." });
    }
  };

  const handleAddToFavorites = async () => {
     if (!user) {
      toast({ title: "Ошибка", description: "Пожалуйста, войдите в систему, чтобы добавить товар в избранное." });
      return;
    }
     try {
       const favoritesCollection = collection(db, "users", user.uid, "favorites");
       const q = query(favoritesCollection, where("bouquetId", "==", id));
       const querySnapshot = await getDocs(q);

       if (querySnapshot.empty) {
          await addDoc(favoritesCollection, {
            bouquetId: id,
            name: title,
            image,
            price: parseFloat(price),
            rating,
            reviews: reviewsCount,
            description,
            addedDate: serverTimestamp(),
          });
          toast({ title: "Успешно!", description: `"${title}" добавлен в избранное.` });
       } else {
         toast({ title: "Информация", description: `"${title}" уже в избранном.` });
       }
    } catch (error) {
      console.error("Error adding to favorites: ", error);
      toast({ title: "Ошибка", description: "Не удалось добавить товар в избранное." });
    }
  };

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
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
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white shadow-sm" onClick={handleAddToFavorites}>
            <Heart className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white shadow-sm">
            <Eye className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full bg-rose-accent hover:bg-rose-dark text-white" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
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
        {rating !== undefined && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            {reviewsCount !== undefined && (
              <span className="text-xs text-muted-foreground">({reviewsCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-foreground">{parseFloat(price).toLocaleString()} ₽</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{parseFloat(originalPrice).toLocaleString()} ₽</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
