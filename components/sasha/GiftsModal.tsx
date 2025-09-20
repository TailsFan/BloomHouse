
"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Gift {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const isValidUrl = (urlString: string) => {
  if (!urlString) return false;
  try {
    new URL(urlString);
    return true;
  }
  catch(e){
    return false;
  }
}

export function GiftsModal({ isOpen, onClose }: GiftsModalProps) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetchGifts = async () => {
        setLoading(true);
        try {
          const giftsCollection = collection(db, "gifts");
          const giftsSnapshot = await getDocs(giftsCollection);
          const giftsList = giftsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gift));
          setGifts(giftsList);
        } catch (error) {
          console.error("Error fetching gifts: ", error);
        }
        setLoading(false);
      };

      fetchGifts();
    }
  }, [isOpen]);

  const handleAddToCart = async (gift: Gift) => {
    if (!user) {
      toast({ title: "Ошибка", description: "Пожалуйста, войдите в систему, чтобы добавить товар в корзину." });
      return;
    }
    try {
      const cartCollection = collection(db, "users", user.uid, "cart");
      const q = query(cartCollection, where("bouquetId", "==", gift.id)); // Using bouquetId for consistency
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const newQuantity = existingDoc.data().quantity + 1;
        await updateDoc(doc(db, "users", user.uid, "cart", existingDoc.id), { quantity: newQuantity });
        toast({ title: "Успешно!", description: `Количество "${gift.name}" в корзине обновлено.` });
      } else {
        await addDoc(cartCollection, {
          bouquetId: gift.id,
          name: gift.name,
          image: gift.image,
          price: gift.price,
          quantity: 1,
          description: gift.description,
        });
        toast({ title: "Успешно!", description: `"${gift.name}" добавлен в корзину.` });
      }
    } catch (error) {
      console.error("Error adding gift to cart: ", error);
      toast({ title: "Ошибка", description: "Не удалось добавить товар в корзину." });
    }
  };

  const validGifts = gifts.filter(gift => isValidUrl(gift.image));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-primary">
            🧸 Мягкие игрушки в подарок
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-muted-foreground mb-6">
            Дополните ваш букет милой мягкой игрушкой и сделайте подарок еще более особенным!
          </p>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка подарков...</p>
            </div>
          ) : validGifts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Подарки не найдены.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Похоже, в базе данных еще нет подарков или у них некорректные URL изображений.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {validGifts.map((gift) => (
                <div key={gift.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Image
                      src={gift.image}
                      alt={gift.name}
                      width={400}
                      height={300}
                      className="w-full h-36 sm:h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-rose-accent" />
                    </button>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="font-medium text-foreground text-sm sm:text-base mb-1 sm:mb-2">{gift.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{gift.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-semibold text-primary">{gift.price.toLocaleString()} ₽</span>
                      <Button 
                        size="sm"
                        className="bg-rose-accent hover:bg-rose-dark text-white text-xs sm:text-sm"
                        onClick={() => handleAddToCart(gift)}
                      >
                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
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
